<?php 
//namespace Laravel; defined('DS') or die('No direct script access.');

class Crypto {
  public static $cipher = MCRYPT_RIJNDAEL_256;
  public static $mode = MCRYPT_MODE_CBC;
  public static $block = 32;

  /**
   * Encrypt a string using Mcrypt.
   *
   * The string will be encrypted using the AES-256 scheme and will be base64 encoded.
   */
  public static function encrypt($value){
    $iv = mcrypt_create_iv(static::iv_size(), static::randomizer());
    $value = static::pad($value);
    $value = mcrypt_encrypt(static::$cipher, static::key(), $value, static::$mode, $iv);
    return base64_encode($iv.$value);
  }

  public static function decrypt($value){
    $value = base64_decode($value);

    // To decrypt the value, we first need to extract the initialization vector and
    // the encrypted value. The initialization vector size varies across different
    // encryption ciphers and modes, so we'll get the correct size.
    $iv = substr($value, 0, static::iv_size());
    $value = substr($value, static::iv_size());

    // Once we have the initialization vector and the value, we can give them both
    // to Mcrypt for decryption. The value is sometimes padded with \0,
    // so we will trim all of the padding characters.
    $key = static::key();

    $value = mcrypt_decrypt(static::$cipher, $key, $value, static::$mode, $iv);
    return static::unpad($value);
  }

  /**
   * Get the most secure random number generator for the system.
   */
  public static function randomizer(){
    // There are various sources from which we can get random numbers
    // but some are more random than others. We'll choose the most
    // random source we can for this server environment.
    if (defined('MCRYPT_DEV_URANDOM')){
      return MCRYPT_DEV_URANDOM;
    }
    elseif (defined('MCRYPT_DEV_RANDOM')){
      return MCRYPT_DEV_RANDOM;
    }
    // When using the default random number generator, we'll seed
    // the generator on each call to ensure the results are as
    // random as we can possibly get them.
    else{
      mt_srand();
      return MCRYPT_RAND;
    }
  }

  /**
   * Get the initialization vector size for the cipher and mode.
   */
  protected static function iv_size(){
    return mcrypt_get_iv_size(static::$cipher, static::$mode);
  }

  /**
   * Add PKCS7 compatible padding on the given value.
   */
  protected static function pad($value){
    $pad = static::$block - (strlen($value) % static::$block);
    return $value .= str_repeat(chr($pad), $pad);
  }

  /**
   * Remove the PKCS7 compatible padding from the given value.
   */
  protected static function unpad($value){
    $pad = ord($value[($length = strlen($value)) - 1]);

    if ($pad and $pad < static::$block){
      // If the correct padding is present on the string, we will remove
      // it and return the value. Otherwise, we'll throw an exception
      // as the padding appears to have been changed.
      if (preg_match('/'.chr($pad).'{'.$pad.'}$/', $value)){
        return substr($value, 0, $length - $pad);
      }

      // If the padding characters do not match the expected padding
      // for the value we'll bomb out with an exception since the
      // encrypted value seems to have been changed.
      else{
        throw new \Exception("Decryption error. Padding is invalid.");
      }
    }
    return $value;
  }

  /**
   * Get the encryption key from the application configuration.
   */
  protected static function key(){
    return 'wqlasjdf.da/asdfjklasd.asdfowqew';
  }

  /**
  * Hash a password using the Bcrypt hashing scheme.
  *
  * <code>
  *              // Create a Bcrypt hash of a value
  *              $hash = Hash::make('secret');
  *
  *              // Use a specified number of iterations when creating the hash
  *              $hash = Hash::make('secret', 12);
  * </code>
  */
  public static function hash($value, $rounds = 8){
    $work = str_pad($rounds, 2, '0', STR_PAD_LEFT);

    // Bcrypt expects the salt to be 22 base64 encoded characters including
    // dots and slashes. We will get rid of the plus signs included in the
    // base64 data and replace them with dots.
    //$salt = Str::random(40);
    $salt = openssl_random_pseudo_bytes(16);

    $salt = substr(strtr(base64_encode($salt), '+', '.'), 0 , 22);
    return crypt($value, '$2a$'.$work.'$'.$salt);
  }

  /**
  * Determine if an unhashed value matches a Bcrypt hash.
  */
  public static function checkhash($value, $hash){
    return crypt($value, $hash) === $hash;
  }
}
