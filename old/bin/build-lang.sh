#!/bin/bash
# Convert translations to JS and sync PO/MO with current POT
# Requires: dos2unix, sed, msgmerge, msgfmt, curl
#
# Note: this script uses the Loco REST API at localise.biz, subject to its Terms of Service.
# This API may be removed, changed or usage blocked at any time without notice or reason.
#

ROOT="`dirname $0`/..";
LOCO="https://localise.biz/"

cd  $ROOT/languages;
dos2unix loco-translate.pot;

for po in *.po; do
  echo "Building `basename $po`"
  dos2unix $po;
  
  # Sync PO and compile MO (disable this step if POT is not up to date)
  mo=`echo $po | sed s/\.po/\.mo/`
  msgmerge $po loco-translate.pot --update --backup=off --silent --no-fuzzy-matching
  msgfmt $po -o $mo --use-fuzzy --no-hash --statistics
  
  # Javascript conversion (currently the whole PO)
  # TODO replace with PHP script to remove dependency on the Loco API
  js=`echo $po | sed s/\.po/\.js/`
  curl -s --data-binary @$po "$LOCO/api/convert/po/loco.js?index=text&pretty" | sed 's/var t =/loco = window.loco||{}, loco.t =/' > ../pub/js/lang/$js
  echo "Saved $js\n"
done

echo Done
