<?php
/*
 csscolor.php
 Copyright 2004 Patrick Fitzgerald
 http://www.barelyfitz.com/projects/csscolor/

 This program is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

//require_once 'PEAR.php';

define('CSS_COLOR_ERROR', 100);

class CSS_Color 
{
  //==================================================
  //==PARAMETERS======================================
  //==================================================

  // $this->bg = array of CSS color values
  // $this->bg[0] is the bg color
  // $this->bg['+1'..'+5'] are lighter colors
  // $this->bg['-1'..'-5'] are darker colors
  var $bg = array();

  // $this->fg = array of foreground colors.
  // Each color corresponds to a background color.
  var $fg = array();

  // brightDiff is the minimum brightness difference
  // between the background and the foreground.
  // Note: you should not change this directly,
  // instead use setBrightDiff() and getBrightDiff()
  var $minBrightDiff = 126;
  
  // colorDiff is the minimum color difference
  // between the background and the foreground.
  // Note: you should not change this directly,
  // instead use setColorDiff() and getColorDiff()
  var $minColorDiff = 500;

  //==================================================
  //==CONSTRUCTOR=====================================
  //==================================================

  function CSS_Color($bgHex, $fgHex='')
  {
    // This is the constructor method for the class,
    // which is called when a new object is created.

    // Initialize this PEAR object so I can
    // use the PEAR error return mechanism
//    $this->PEAR();

    // Initialize the palette
    $this->setPalette($bgHex, $fgHex);
  }

  //==================================================
  //==METHODS=========================================
  //==================================================

  //--------------------------------------------------
  function setPalette($bgHex, $fgHex = '')
  {
    // Initialize the color palettes

    // If a foreground color was not specified,
    // just use the background color.
    if (!$fgHex) {
      $fgHex = $bgHex;
    }

    // Clear the existing palette
    $this->bg = array();
    $this->fg = array();

    // Make sure we got a valid hex value
    if (!$this->isHex($bgHex)) {
      $this->raiseError("background color '$bgHex' is not a hex color value",
			__FUNCTION__, __LINE__);
      return false;
    }

    // Set the bg color
    $this->bg[0] = $bgHex;

    $this->bg['+1'] = $this->lighten($bgHex, .85);
    $this->bg['+2'] = $this->lighten($bgHex, .75);
    $this->bg['+3'] = $this->lighten($bgHex, .5);
    $this->bg['+4'] = $this->lighten($bgHex, .25);
    $this->bg['+5'] = $this->lighten($bgHex, .1);
    $this->bg['+6'] = $this->lighten($bgHex, .03);

    $this->bg['-1'] = $this->darken($bgHex, .85);
    $this->bg['-2'] = $this->darken($bgHex, .75);
    $this->bg['-3'] = $this->darken($bgHex, .5);
    $this->bg['-4'] = $this->darken($bgHex, .25);
    $this->bg['-5'] = $this->darken($bgHex, .1);
    $this->bg['-6'] = $this->darken($bgHex, .03);

    // Make sure we got a valid hex value
    if (!$this->isHex($fgHex)) {
      $this->raiseError("background color '$bgHex' is not a hex color value",
			__FUNCTION__, __LINE__);
      return false;
    }

    // Set up the foreground colors
    $this->fg[0]    = $this->calcFG( $this->bg[0], $fgHex);
    $this->fg['+1'] = $this->calcFG( $this->bg['+1'], $fgHex);
    $this->fg['+2'] = $this->calcFG( $this->bg['+2'], $fgHex);
    $this->fg['+3'] = $this->calcFG( $this->bg['+3'], $fgHex);
    $this->fg['+4'] = $this->calcFG( $this->bg['+4'], $fgHex);
    $this->fg['+5'] = $this->calcFG( $this->bg['+5'], $fgHex);
    $this->fg['+6'] = $this->calcFG( $this->bg['+6'], $fgHex);
    $this->fg['-1'] = $this->calcFG( $this->bg['-1'], $fgHex);
    $this->fg['-2'] = $this->calcFG( $this->bg['-2'], $fgHex);
    $this->fg['-3'] = $this->calcFG( $this->bg['-3'], $fgHex);
    $this->fg['-4'] = $this->calcFG( $this->bg['-4'], $fgHex);
    $this->fg['-5'] = $this->calcFG( $this->bg['-5'], $fgHex);
    $this->fg['-6'] = $this->calcFG( $this->bg['-6'], $fgHex);
  }

  //--------------------------------------------------
  function lighten($hex, $percent)
  {
    return $this->mix($hex, $percent, 255);
  }

  //--------------------------------------------------
  function darken($hex, $percent)
  {
    return $this->mix($hex, $percent, 0);
  }

  //--------------------------------------------------
  function mix($hex, $percent, $mask)
  {

    // Make sure inputs are valid
    if (!is_numeric($percent) || $percent < 0 || $percent > 1) {
      $this->raiseError("percent=$percent is not valid",
			__FUNCTION__, __LINE__);
      return false;
    }

    if (!is_int($mask) || $mask < 0 || $mask > 255) {
      $this->raiseError("mask=$mask is not valid",
			__FUNCTION__, __LINE__);
      return false;
    }

    $rgb = $this->hex2RGB($hex);
    if (!is_array($rgb)) {
      // hex2RGB will raise an error
      return false;
    }

    for ($i=0; $i<3; $i++) {
      $rgb[$i] = round($rgb[$i] * $percent) + round($mask * (1-$percent));

      // In case rounding up causes us to go to 256
      if ($rgb[$i] > 255) {
	$rgb[$i] = 255;
      }

    }
    return $this->RGB2Hex($rgb);
  }

  //--------------------------------------------------
  function hex2RGB($hex)
  {
    //
    // Given a hex color (rrggbb or rgb),
    // returns an array (r, g, b) with decimal values
    // If $hex is not the correct format,
    // returns false.
    //
    // example:
    // $d = hex2RGB('#abc');
    // if (!$d) { error }

    // Regexp for a valid hex digit
    $d = '[a-fA-F0-9]';
    
    // Make sure $hex is valid
    if (preg_match("/^($d$d)($d$d)($d$d)\$/", $hex, $rgb)) {
      
      return array(
		   hexdec($rgb[1]),
		   hexdec($rgb[2]),
		   hexdec($rgb[3])
		   );
    }
    if (preg_match("/^($d)($d)($d)$/", $hex, $rgb)) {
      
      return array(
		   hexdec($rgb[1] . $rgb[1]),
		   hexdec($rgb[2] . $rgb[2]),
		   hexdec($rgb[3] . $rgb[3])
		   );
    }

    $this->raiseError("cannot convert hex '$hex' to RGB", __FUNCTION__, __LINE__);
    return false;
  }

  //--------------------------------------------------
  function RGB2Hex($rgb)
  {
    // Given an array(rval,gval,bval) consisting of
    // decimal color values (0-255), returns a hex string
    // suitable for use with CSS.
    // Returns false if the input is not in the correct format.
    // Example:
    // $h = RGB2Hex(array(255,0,255));
    // if (!$h) { error };

    // Make sure the input is valid
    if(!$this->isRGB($rgb)) {
      $this->raiseError("RGB value is not valid", __FUNCTION__, __LINE__);
      return false;
    }

    $hex = "";
    for($i=0; $i < 3; $i++) {

      // Convert the decimal digit to hex
      $hexDigit = dechex($rgb[$i]);

      // Add a leading zero if necessary
      if(strlen($hexDigit) == 1) {
	$hexDigit = "0" . $hexDigit;
      }

      // Append to the hex string
      $hex .= $hexDigit;
    }

    // Return the complete hex string
    return $hex;
  }

  //--------------------------------------------------
  function isHex($hex)
  {
    // Returns true if $hex is a valid CSS hex color.
    // The "#" character at the start is optional.

    // Regexp for a valid hex digit
    $d = '[a-fA-F0-9]';
    
    // Make sure $hex is valid
    if (preg_match("/^#?$d$d$d$d$d$d\$/", $hex) ||
	preg_match("/^#?$d$d$d\$/", $hex)) {
      return true;
    }
    return false;
  }

  //--------------------------------------------------
  function isRGB($rgb)
  {
    // Returns true if $rgb is an array with three valid
    // decimal color digits.

    if (!is_array($rgb) || count($rgb) != 3) {
      return false;
    }

    for($i=0; $i < 3; $i++) {

      // Get the decimal digit
      $dec = intval($rgb[$i]);

      // Make sure the decimal digit is between 0 and 255
      if (!is_int($dec) || $dec < 0 || $dec > 255) {
	return false;
      }
    }

    return true;
  }

  //--------------------------------------------------
  function calcFG($bgHex, $fgHex)
  {
    // Given a background color $bgHex and a foreground color $fgHex,
    // modifies the foreground color so it will have enough contrast
    // to be seen against the background color.
    //
    // The following parameters are used:
    // $this->minBrightDiff
    // $this->minColorDiff

    // Loop through brighter and darker versions
    // of the foreground color.
    // The numbers here represent the amount of
    // foreground color to mix with black and white.
    foreach (array(1, 0.75, 0.5, 0.25, 0) as $percent) {

      $darker = $this->darken($fgHex, $percent);
      $lighter = $this->lighten($fgHex, $percent);

      $darkerBrightDiff  = $this->brightnessDiff($bgHex, $darker);
      $lighterBrightDiff = $this->brightnessDiff($bgHex, $lighter);

      if ($lighterBrightDiff > $darkerBrightDiff) {
	$newFG = $lighter;
	$newFGBrightDiff = $lighterBrightDiff;
      } else {
	$newFG = $darker;
	$newFGBrightDiff = $darkerBrightDiff;
      }
      $newFGColorDiff = $this->colorDiff($bgHex, $newFG);

      if ($newFGBrightDiff >= $this->minBrightDiff &&
	  $newFGColorDiff >= $this->minColorDiff) {
	break;
      }
    }

    return $newFG;
  }

  //--------------------------------------------------
  function getMinBrightDiff()
  {
    return $this->minBrightDiff;
  }
  function setMinBrightDiff($b, $resetPalette = true)
  {
    $this->minBrightDiff = $b;
    if ($resetPalette) {
      $this->setPalette($this->bg[0],$this->fg[0]);
    }
  }

  //--------------------------------------------------
  function getMinColorDiff()
  {
    return $this->minColorDiff;
  }
  function setMinColorDiff($d, $resetPalette = true)
  {
    $this->minColorDiff = $d;
    if ($resetPalette) {
      $this->setPalette($this->bg[0],$this->fg[0]);
    }
  }

  //--------------------------------------------------
  function brightness($hex)
  {
    // Returns the brightness value for a color,
    // a number between zero and 178.
    // To allow for maximum readability, the difference between
    // the background brightness and the foreground brightness
    // should be greater than 125.

    $rgb = $this->hex2RGB($hex);
    if (!is_array($rgb)) {
      // hex2RGB will raise an error
      return false;
    }

    return( (($rgb[0] * 299) + ($rgb[1] * 587) + ($rgb[2] * 114)) / 1000 );
  }

  //--------------------------------------------------
  function brightnessDiff($hex1, $hex2)
  {
    // Returns the brightness value for a color,
    // a number between zero and 178.
    // To allow for maximum readability, the difference between
    // the background brightness and the foreground brightness
    // should be greater than 125.

    $b1 = $this->brightness($hex1);
    $b2 = $this->brightness($hex2);
    if (is_bool($b1) || is_bool($b2)) {
      return false;
    }
    return abs($b1 - $b2);
  }

  //--------------------------------------------------
  function colorDiff($hex1, $hex2)
  {
    // Returns the contrast between two colors,
    // an integer between 0 and 675.
    // To allow for maximum readability, the difference between
    // the background and the foreground color should be > 500.

    $rgb1 = $this->hex2RGB($hex1);
    $rgb2 = $this->hex2RGB($hex2);

    if (!is_array($rgb1) || !is_array($rgb2)) {
      // hex2RGB will raise an error
      return -1;
    }

    $r1 = $rgb1[0];
    $g1 = $rgb1[1];
    $b1 = $rgb1[2];

    $r2 = $rgb2[0];
    $g2 = $rgb2[1];
    $b2 = $rgb2[2];

    return(abs($r1-$r2) + abs($g1-$g2) + abs($b1-$b2));
  }

  //--------------------------------------------------
  function raiseError($message, $method, $line)
  {
  //  $error = PEAR::raiseError(sprintf("%s.%s() line %d: %s",get_class($this), $method, $line, $message),CSS_COLOR_ERROR);
  }
}
$gray = new CSS_Color("808080");
?>




<?
function comp($hexcode,$angle = 15){
    // $hexcode is the six digit hex colour code we want to convert

    $redhex  = substr($hexcode,0,2);
    $greenhex = substr($hexcode,2,2);
    $bluehex = substr($hexcode,4,2);

    // $var_r, $var_g and $var_b are the three decimal fractions to be input to our RGB-to-HSL conversion routine

    $var_r = (hexdec($redhex)) / 255;
    $var_g = (hexdec($greenhex)) / 255;
    $var_b = (hexdec($bluehex)) / 255;


    // Input is $var_r, $var_g and $var_b from above
    // Output is HSL equivalent as $h, $s and $l — these are again expressed as fractions of 1, like the input values

    $var_min = min($var_r,$var_g,$var_b);
    $var_max = max($var_r,$var_g,$var_b);
    $del_max = $var_max - $var_min;

    $l = ($var_max + $var_min) / 2;

    if ($del_max == 0)
    {
            $h = 0;
            $s = 0;
    }
    else
    {
            if ($l < 0.5)
            {
                    $s = $del_max / ($var_max + $var_min);
            }
            else
            {
                    $s = $del_max / (2 - $var_max - $var_min);
            };

            $del_r = ((($var_max - $var_r) / 6) + ($del_max / 2)) / $del_max;
            $del_g = ((($var_max - $var_g) / 6) + ($del_max / 2)) / $del_max;
            $del_b = ((($var_max - $var_b) / 6) + ($del_max / 2)) / $del_max;

            if ($var_r == $var_max)
            {
                    $h = $del_b - $del_g;
            }
            elseif ($var_g == $var_max)
            {
                    $h = (1 / 3) + $del_r - $del_b;
            }
            elseif ($var_b == $var_max)
            {
                    $h = (2 / 3) + $del_g - $del_r;
            };

            if ($h < 0)
            {
                    $h += 1;
            };

            if ($h > 1)
            {
                    $h -= 1;
            };
    };


                // Calculate the opposite hue, $h2

                $h2 = $h + ($angle/36);

                if ($h2 > 1)
                        {
                                $h2 -= 1;
                        };
$s = $s -0.4;

       // Input is HSL value of complementary colour, held in $h2, $s, $l as fractions of 1
       // Output is RGB in normal 255 255 255 format, held in $r, $g, $b
       // Hue is converted using function hue_2_rgb, shown at the end of this code

        if ($s == 0)
        {
                $r = $l * 255;
                $g = $l * 255;
                $b = $l * 255;
        }
        else
        {
                if ($l < 0.5)
                {
                        $var_2 = $l * (1 + $s);
                }
                else
                {
                        $var_2 = ($l + $s) - ($s * $l);
                };

                $var_1 = 2 * $l - $var_2;
                $r = 255 * hue_2_rgb($var_1,$var_2,$h2 + (1 / 3));
                $g = 255 * hue_2_rgb($var_1,$var_2,$h2);
                $b = 255 * hue_2_rgb($var_1,$var_2,$h2 - (1 / 3));
        };

        $rhex = sprintf("%02X",round($r));
        $ghex = sprintf("%02X",round($g));
        $bhex = sprintf("%02X",round($b));

        $rgbhex = $rhex.$ghex.$bhex;
        return $rgbhex;
}
       // Function to convert hue to RGB, called from above

        function hue_2_rgb($v1,$v2,$vh)
        {
                if ($vh < 0)
                {
                        $vh += 1;
                };

                if ($vh > 1)
                {
                        $vh -= 1;
                };

                if ((6 * $vh) < 1)
                {
                        return ($v1 + ($v2 - $v1) * 6 * $vh);
                };

                if ((2 * $vh) < 1)
                {
                        return ($v2);
                };

                if ((3 * $vh) < 2)
                {
                        return ($v1 + ($v2 - $v1) * ((2 / 3 - $vh) * 6));
                };

                return ($v1);
        };









?><?php 
function lighten($hexcode,$percent){
    $rgb = _color_unpack("#".$hexcode,true);
    $hsl = _color_rgb2hsl($rgb);
    $hsl[2] = $hsl[2]*(1+$percent/100);
    $rgb =  _color_hsl2rgb($hsl);

    $hex = _color_pack($rgb,true);
    return $hex;
}
function darken($hexcode,$percent){
    $rgb = _color_unpack("#".$hexcode,true);
    $hsl = _color_rgb2hsl($rgb);
    $hsl[2] = $hsl[2]*(1-$percent/100);
    $rgb =  _color_hsl2rgb($hsl);

    $hex = _color_pack($rgb,true);
    return $hex;
}

function normalize($hexcode,$l=.5){
    $rgb = _color_unpack("#".$hexcode,true);
    $hsl = _color_rgb2hsl($rgb);
    $hsl[2] = $l;
    $rgb =  _color_hsl2rgb($hsl);

    $hex = _color_pack($rgb,true);
    return $hex;
}
function spin($hexcode,$angle){
    $rgb = _color_unpack("#".$hexcode,true);
    $hsl = _color_rgb2hsl($rgb);

    $h2 = $hsl[0] + ($angle/360);

    if ($h2 > 1) {
      $h2 -= 1;
    };

    $hsl[0] = $h2;
    $rgb =  _color_hsl2rgb($hsl);

    $hex = _color_pack($rgb,true);
    return $hex;
}

function rgb2hex($rgb){
    $hex = "";
    for($i=0; $i < 3; $i++) {

      // Convert the decimal digit to hex
      $hexDigit = dechex($rgb[$i]);

      // Add a leading zero if necessary
      if(strlen($hexDigit) == 1) {
        $hexDigit = "0" . $hexDigit;
      }

      // Append to the hex string
      $hex .= $hexDigit;
    }

    // Return the complete hex string
    return $hex;
}
function _color_rgb2hsl($rgb) { 
  $r = $rgb[0]; 
  $g = $rgb[1]; 
  $b = $rgb[2]; 
  $min = min($r, min($g, $b)); 
  $max = max($r, max($g, $b)); 
  $delta = $max - $min; 
  $l = ($min + $max) / 2; 
  $s = 0; 
  if ($l > 0 && $l < 1) { 
    $s = $delta / ($l < 0.5 ? (2 * $l) : (2 - 2 * $l)); 
  } 
  $h = 0; 
  if ($delta > 0) { 
    if ($max == $r && $max != $g) $h += ($g - $b) / $delta; 
    if ($max == $g && $max != $b) $h += (2 + ($b - $r) / $delta); 
    if ($max == $b && $max != $r) $h += (4 + ($r - $g) / $delta); 
    $h /= 6; 
  } 
  return array($h, $s, $l); 
} 

function _color_hsl2rgb($hsl) { 
  $h = $hsl[0]; 
  $s = $hsl[1]; 
  $l = $hsl[2]; 
  $m2 = ($l <= 0.5) ? $l * ($s + 1) : $l + $s - $l*$s; 
  $m1 = $l * 2 - $m2; 
  return array(_color_hue2rgb($m1, $m2, $h + 0.33333), 
               _color_hue2rgb($m1, $m2, $h), 
               _color_hue2rgb($m1, $m2, $h - 0.33333)); 
} 
/** 
 * Helper function for _color_hsl2rgb(). 
 */ 
function _color_hue2rgb($m1, $m2, $h) { 
  $h = ($h < 0) ? $h + 1 : (($h > 1) ? $h - 1 : $h); 
  if ($h * 6 < 1) return $m1 + ($m2 - $m1) * $h * 6; 
  if ($h * 2 < 1) return $m2; 
  if ($h * 3 < 2) return $m1 + ($m2 - $m1) * (0.66666 - $h) * 6; 
  return $m1; 
} 
/** 
 * Convert a hex color into an RGB triplet. 
 */ 
function _color_unpack($hex, $normalize = false) { 
  if (strlen($hex) == 4) { 
    $hex = $hex[1] . $hex[1] . $hex[2] . $hex[2] . $hex[3] . $hex[3]; 
  } 
  $c = hexdec($hex); 
  for ($i = 16; $i >= 0; $i -= 8) { 
    $out[] = (($c >> $i) & 0xFF) / ($normalize ? 255 : 1); 
  } 
  return $out; 
} 
/** 
 * Convert an RGB triplet to a hex color. 
 */ 
function _color_pack($rgb, $normalize = false) { 
  foreach ($rgb as $k => $v) { 
    $out |= (($v * ($normalize ? 255 : 1)) << (16 - $k * 8)); 
  } 
  return '#'. str_pad(dechex($out), 6, 0, STR_PAD_LEFT); 
} 

/* $testrgb = array(0.2,0.75,0.4); //RGB to start with 
print_r($testrgb); 

  print "Hex: "; 
  $testhex = "#C5003E"; 
  print $testhex; 
  $testhex2rgb = _color_unpack($testhex,true);  
  print "<br />RGB: "; 
  var_dump($testhex2rgb); 
  print "<br />HSL color module: "; 
  $testrgb2hsl = _color_rgb2hsl($testhex2rgb); //Converteren naar HSL 
  var_dump($testrgb2hsl); 
  print "<br />RGB: "; 
  $testhsl2rgb = _color_hsl2rgb($testrgb2hsl); // En weer terug naar RGB 
  var_dump($testhsl2rgb); 
  print "<br />Hex: "; 
  $testrgb2hex = _color_pack($testhsl2rgb,true); 
  var_dump($testrgb2hex);*/ 
  ?>
