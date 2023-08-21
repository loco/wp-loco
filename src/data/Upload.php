<?php
/**
 * Simple wrapper for transient file uploads carrying PO data.
 */
class Loco_data_Upload extends Loco_fs_File {

    /**
     * @var array
     */
    private $data;


    /**
     * Pass through temporary file data
     * @param string $key in $_FILES known to exist
     * @return string
     * @throws Loco_error_UploadException
     */
    public static function src($key){
        $upload = new Loco_data_Upload($_FILES[$key]);
        return $upload->getContents();
    }


    /**
     * @param array $data member of $_FILE
     * @throws Loco_error_UploadException
     */
    public function __construct( array $data ){
        // https://www.php.net/manual/en/features.file-upload.errors.php
        $code = (int) $data['error'];
        switch( $code ){
            case UPLOAD_ERR_OK:
                break;
            case UPLOAD_ERR_INI_SIZE:
                throw new Loco_error_UploadException('The uploaded file exceeds the upload_max_filesize directive in php.ini',$code);
            case UPLOAD_ERR_FORM_SIZE:
                throw new Loco_error_UploadException('The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form',$code);
            case UPLOAD_ERR_PARTIAL:
                throw new Loco_error_UploadException('The uploaded file was only partially uploaded',$code);
            case UPLOAD_ERR_NO_FILE:
                throw new Loco_error_UploadException('No file was uploaded, or data is empty',$code);
            case UPLOAD_ERR_NO_TMP_DIR:
                throw new Loco_error_UploadException('Missing temporary folder for uploaded file',$code);
            case UPLOAD_ERR_CANT_WRITE:
                throw new Loco_error_UploadException('Failed to save uploaded file to disk',$code);
            case UPLOAD_ERR_EXTENSION:
                throw new Loco_error_UploadException('Your server blocked the file upload',$code);
            default:
                throw new Loco_error_UploadException('Unknown file upload error',$code);
        }
        // Upload is OK according to PHP, but may need moving (if upload_tmp_dir is not in open_basedir)
        $path = $data['tmp_name'];
        if( ! Loco_fs_File::is_readable($path) ){
            $safe = get_temp_dir().basename($path);
            if( $safe !== $path ){
                Loco_error_AdminNotices::debug( sprintf('Moving uploaded file: %s -> %s',$path,$safe) );
                if( move_uploaded_file( $path, $safe ) ){
                    register_shutdown_function('unlink',$safe);
                    $data['tmp_name'] = $safe;
                    $path = $safe;
                }
            }
        }
        if( ! is_file($path) ){
            throw new Loco_error_UploadException('Uploaded file is not readable',UPLOAD_ERR_NO_FILE);
        }
        // upload ok, but check it's not empty
        if( 0 === filesize($path) ){
            throw new Loco_error_UploadException('Uploaded file contains no data',UPLOAD_ERR_NO_FILE);
        }
        $this->data = $data;
        parent::__construct($path);
    }


    /**
     * Get name of original file
     * @return string
     */
    public function getOriginalName(){
        return $this->data['name'];
    }

}
 