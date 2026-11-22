<style id="r316-css">
/* ============ R316 · YOUR APP ON THE IPHONE AND IPAD, FOUR WAYS (Ingenium 7.35, 18 November 2026) ============
   Her request (16 November 2026): iPhone and iPad "all four ways" (inside Ingenium; a Home Screen web app; an IPA signed with a free
   Apple ID through Sideloadly or AltStore; an IPA signed with a paid developer account). Her answers (17 November 2026): a paid account
   "Not yet, but plan to"; the Home Screen app "Mac first, GitHub backup"; inside Ingenium "Both" (paired devices, and a file). Her word
   on the live preview (18 November 2026, https://claude.ai/artifact/HMXfpBF7MfUwg9Q8Z2yNRP, source/previews/iphone_ways): "I approve of
   the preview, please just add some colours to the buttons because they all look very plain all in white. Please commit and push it
   everywhere".
   Fabrica's Ship part: the iPhone card ("iPhone and iPad", modules/r112.js), its key Choose a way, and this sheet:
   - Inside Ingenium: Send to my devices (a computer app: her paired devices, from share_status; the app's one page waits on this
     computer, build/desktop/app_apps_735.py, until Ingenium on the device keeps it), or the one page as a file (Fabrica, Your apps,
     Bring one in, on the device). On the device, what waits is offered above Your apps: Keep it here (a new app, or a new version of the
     app of that name), Not now. Run it opens it.
   - On the Home Screen: From my Mac (the computer app serves the web app at /apps/<name>/ on the home Wi-Fi, with its address and a code
     for the camera), or On GitHub Pages (the web app's files on the linked repository's branch gh-pages, Pages switched on).
   - With your Apple ID (free): the IPA (R136), and the steps in Sideloadly. With a developer account (paid): the IPA, and the iPhone and
     iPad build kit for Xcode.
   Each way's keys wear a colour of Ingenium's own, in the recipe of its coloured keys (Schedae's lavender: a tint, the colour's text,
   the light edge above and the 3D shadow, lifting three points; no wash under the pointer): lavender, sky blue (Carpe Diem's), amber,
   emerald. Every card, row and key lifts under the pointer; Minimal or reduced motion keeps them still. */
#fb{--r316-ck:inset 0 1.5px 0 rgba(255,255,255,.95),inset 0 -3px 5px rgba(60,30,90,.16),0 1px 1px rgba(40,20,70,.3),0 3px 4px rgba(40,20,70,.24),0 6px 9px rgba(40,20,70,.18),0 12px 20px rgba(40,20,70,.12);
  --r316-ckhi:inset 0 1.5px 0 #fff,inset 0 -3px 5px rgba(60,30,90,.14),0 3px 4px rgba(40,20,70,.24),0 9px 16px rgba(40,20,70,.2),0 16px 26px rgba(40,20,70,.14);
  --r316-lt:rgba(106,63,181,.14);--r316-lc:#6a3fb5;--r316-st:rgba(74,160,240,.16);--r316-sc:#2f6fd0;--r316-at:rgba(232,144,42,.16);--r316-ac:#b4600f;--r316-et:rgba(31,157,99,.14);--r316-ec:#1a7f50;
  --r316-card:linear-gradient(#ffffff,#f9f7fc);--r316-line:rgba(34,26,46,.1);--r316-on:rgba(106,63,181,.5);--r316-well:#faf8fc;
  --r316-cardsh:inset 0 -1.5px 0 rgba(40,22,68,.13),0 3px 0 rgba(40,22,68,.25),0 6px 8px rgba(40,22,68,.18),0 13px 20px rgba(40,22,68,.12);
  --r316-cardhi:0 2px 0 rgba(60,40,100,.08),0 12px 24px rgba(70,44,130,.16)}
body[data-theme="night"] #fb{--r316-ck:inset 0 1.5px 0 rgba(255,255,255,.16),inset 0 -3px 5px rgba(0,0,0,.45),0 1px 1px rgba(0,0,0,.65),0 3px 4px rgba(0,0,0,.55),0 6px 9px rgba(0,0,0,.45),0 12px 20px rgba(0,0,0,.32);
  --r316-ckhi:inset 0 1.5px 0 rgba(255,255,255,.2),inset 0 -3px 5px rgba(0,0,0,.4),0 3px 4px rgba(0,0,0,.6),0 9px 16px rgba(0,0,0,.5),0 16px 26px rgba(0,0,0,.4);
  --r316-lt:rgba(183,156,230,.15);--r316-lc:#b79ce6;--r316-st:rgba(124,196,255,.15);--r316-sc:#7cc4ff;--r316-at:rgba(240,176,96,.15);--r316-ac:#f0b060;--r316-et:rgba(64,192,128,.15);--r316-ec:#6fd8a2;
  --r316-card:linear-gradient(#2a2239,#251e33);--r316-line:rgba(205,184,240,.11);--r316-on:rgba(183,156,230,.45);--r316-well:#1c1626;
  --r316-cardsh:inset 0 1px 0 rgba(255,255,255,.08),inset 0 -2px 0 rgba(0,0,0,.45),0 3px 0 rgba(0,0,0,.75),0 6px 8px rgba(0,0,0,.52),0 13px 20px rgba(0,0,0,.4);
  --r316-cardhi:0 2px 0 rgba(0,0,0,.45),0 14px 28px rgba(0,0,0,.45)}
/* the coloured keys */
#fb .f-btn.c-lav,#fb .f-btn.c-sky,#fb .f-btn.c-amb,#fb .f-btn.c-emr{border-radius:7px;font-weight:600;box-shadow:var(--r316-ck);transition:transform .16s cubic-bezier(.34,1.35,.64,1),box-shadow .16s;animation-fill-mode:backwards}
#fb .f-btn.c-lav,#fb .f-btn.c-lav:hover{background:var(--r316-lt);border-color:var(--r316-lt);color:var(--r316-lc)}
#fb .f-btn.c-sky,#fb .f-btn.c-sky:hover{background:var(--r316-st);border-color:var(--r316-st);color:var(--r316-sc)}
#fb .f-btn.c-amb,#fb .f-btn.c-amb:hover{background:var(--r316-at);border-color:var(--r316-at);color:var(--r316-ac)}
#fb .f-btn.c-emr,#fb .f-btn.c-emr:hover{background:var(--r316-et);border-color:var(--r316-et);color:var(--r316-ec)}
#fb .f-btn.c-lav:hover:not(:disabled),#fb .f-btn.c-sky:hover:not(:disabled),#fb .f-btn.c-amb:hover:not(:disabled),#fb .f-btn.c-emr:hover:not(:disabled){transform:translateY(-3px);box-shadow:var(--r316-ckhi)}
#fb .f-btn.c-lav:active,#fb .f-btn.c-sky:active,#fb .f-btn.c-amb:active,#fb .f-btn.c-emr:active{transform:translateY(1px);box-shadow:inset 0 1px 3px rgba(40,22,68,.22)}
/* the sheet: four ways, each a raised card that opens */
#fb .r316 .r316-ways{display:flex;flex-direction:column;gap:10px;margin-top:4px}
#fb .r316-way{border:1px solid var(--r316-line);background:var(--r316-card);box-shadow:var(--r316-cardsh);border-radius:12px;transition:transform .18s cubic-bezier(.34,1.35,.64,1),box-shadow .18s,border-color .2s;animation:r316rise .34s cubic-bezier(.2,.9,.25,1.2) backwards}
#fb .r316-way:nth-child(2){animation-delay:.05s}#fb .r316-way:nth-child(3){animation-delay:.1s}#fb .r316-way:nth-child(4){animation-delay:.15s}
#fb .r316-way:hover{transform:translateY(-2px);box-shadow:var(--r316-cardsh),var(--r316-cardhi)}
#fb .r316-way[aria-expanded="true"]{border-color:var(--r316-on)}
#fb .r316-wh{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:0;background:none;padding:11px 12px;border-radius:12px;color:var(--f-ink1);cursor:pointer;font:inherit}
#fb .r316-wh .ic{flex:0 0 34px;height:34px;border-radius:10px;display:grid;place-items:center;background:var(--r316-card);border:1px solid var(--r316-line);box-shadow:var(--r316-ck);color:var(--f-acc);transition:transform .3s cubic-bezier(.2,.9,.25,1.2)}
#fb .r316-wh:hover .ic{transform:rotate(-6deg) scale(1.06)}
#fb .r316-wh .ic svg{width:19px;height:19px}
#fb .r316-wh .tx{flex:1;min-width:0}
#fb .r316-wh .tx b{display:block;font:600 14.5px/1.3 inherit}
#fb .r316-wh .tx span{display:block;font-size:12.5px;color:var(--f-ink2);line-height:1.4}
#fb .r316-wh .chev{flex:0 0 auto;color:var(--f-ink3);transition:transform .25s cubic-bezier(.2,.9,.25,1.2);font-size:18px}
#fb .r316-way[aria-expanded="true"] .chev{transform:rotate(90deg)}
#fb .r316-wb{padding:0 12px 12px 56px;display:flex;flex-direction:column;gap:10px}
@media (max-width:560px){#fb .r316-wb{padding-left:12px}}
#fb .r316-opt{border:1px solid var(--r316-line);border-radius:10px;background:var(--r316-well);padding:10px 11px;display:flex;flex-direction:column;gap:7px;transition:transform .2s cubic-bezier(.2,.9,.25,1.2),box-shadow .2s}
#fb .r316-opt:hover{transform:translateY(-1.5px);box-shadow:var(--r316-cardhi)}
#fb .r316-opt .oh{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}
#fb .r316-opt .oh b{font-weight:600;font-size:13.5px}
#fb .r316-opt p{margin:0;color:var(--f-ink2);font-size:12.5px;line-height:1.5}
#fb .r316-opt ol{margin:0;padding-left:18px;color:var(--f-ink2);font-size:12.5px;line-height:1.55}
#fb .r316-opt ol li::marker{color:var(--f-acc);font-weight:700}
#fb .r316-opt p.r316-note,#fb p.r316-note{font-size:12px;color:var(--f-ink3)}
#fb .r316-keys{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
#fb .r316-devs{display:flex;flex-direction:column;gap:6px}
#fb .r316-dev{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:9px;background:var(--r316-card);border:1px solid var(--r316-line);transition:transform .2s cubic-bezier(.2,.9,.25,1.2)}
#fb .r316-dev:hover{transform:translateX(3px)}
#fb .r316-dev b{font-weight:600;font-size:13px;flex:1;min-width:0}
#fb .r316-dev .st{font-size:12px;color:var(--f-ink3)}
#fb .r316-dev .dot{width:8px;height:8px;border-radius:50%;background:var(--f-ok);box-shadow:0 0 0 3px rgba(47,122,85,.12)}
#fb .r316-dev .dot.off{background:var(--f-ink3);box-shadow:0 0 0 3px var(--r316-line)}
#fb .r316-addr{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
#fb .r316-ac{display:flex;flex-direction:column;gap:7px;min-width:0;flex:1}
#fb .r316-addr code{font:600 12.5px/1.4 var(--f-mono);color:var(--f-ink1);background:var(--r316-card);border:1px solid var(--r316-line);border-radius:8px;padding:6px 8px;overflow-wrap:anywhere;user-select:all}
#fb .r316-qr{width:104px;height:104px;border-radius:10px;background:#fff;padding:4px;border:1px solid var(--r316-line);box-shadow:var(--r316-ck);flex:0 0 auto;transition:transform .25s cubic-bezier(.2,.9,.25,1.2)}
#fb .r316-qr:hover{transform:scale(1.05) rotate(-2deg)}
#fb .r316-qr svg{width:100%;height:100%;display:block}
#fb .r316-facts{display:flex;gap:6px;flex-wrap:wrap}
/* on the device: what her computer sent, above Your apps */
#fb .r316-in{display:flex;flex-direction:column;gap:6px;margin:0 0 10px}
#fb .r316-inrow{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:12px;border:1px solid var(--r316-on);background:var(--r316-card);box-shadow:var(--r316-cardsh);transition:transform .18s cubic-bezier(.34,1.35,.64,1),box-shadow .18s;animation:r316rise .34s cubic-bezier(.2,.9,.25,1.2) backwards;flex-wrap:wrap}
#fb .r316-inrow:hover{transform:translateY(-2px);box-shadow:var(--r316-cardsh),var(--r316-cardhi)}
#fb .r316-inrow .ic{flex:0 0 30px;height:30px;border-radius:9px;display:grid;place-items:center;color:var(--f-acc);background:var(--r316-lt)}
#fb .r316-inrow .ic svg{width:17px;height:17px}
#fb .r316-inrow .tx{flex:1 1 140px;min-width:0}
#fb .r316-inrow .tx b{display:block;font-size:13.5px}
#fb .r316-inrow .tx span{display:block;font-size:12px;color:var(--f-ink3)}
@keyframes r316rise{from{opacity:0;transform:translateY(6px)}}
body[data-motion="minimal"] #fb .r316-way,body[data-motion="minimal"] #fb .r316-opt,body[data-motion="minimal"] #fb .r316-dev,body[data-motion="minimal"] #fb .r316-inrow,body[data-motion="minimal"] #fb .r316-qr,
body[data-motion="minimal"] #fb .r316-wh .ic,body[data-motion="minimal"] #fb .f-btn.c-lav,body[data-motion="minimal"] #fb .f-btn.c-sky,body[data-motion="minimal"] #fb .f-btn.c-amb,body[data-motion="minimal"] #fb .f-btn.c-emr{animation:none!important;transition:none!important;transform:none!important}
@media (prefers-reduced-motion:reduce){#fb .r316-way,#fb .r316-opt,#fb .r316-dev,#fb .r316-inrow,#fb .r316-qr,#fb .r316-wh .ic,#fb .f-btn.c-lav,#fb .f-btn.c-sky,#fb .f-btn.c-amb,#fb .f-btn.c-emr{animation:none!important;transition:none!important;transform:none!important}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p316"]="started";}catch(_){}
/* R316 · Your app on the iPhone and iPad, four ways: see the note at the top of its styles. The code that draws the codes for an address
   (QR codes) is qrcode-generator 1.4.4 by Kazuhiko Arase, under the MIT licence (its notice is kept with it, below); it is carried in the
   page, so nothing is fetched. */
(function(){
"use strict";
var W=window,D=document;
if(W.IngIphone)return;
//---------------------------------------------------------------------
//
// QR Code Generator for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//
// The word 'QR Code' is registered trademark of
// DENSO WAVE INCORPORATED
//  http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------

var qrcode = function() {

  //---------------------------------------------------------------------
  // qrcode
  //---------------------------------------------------------------------

  /**
   * qrcode
   * @param typeNumber 1 to 40
   * @param errorCorrectionLevel 'L','M','Q','H'
   */
  var qrcode = function(typeNumber, errorCorrectionLevel) {

    var PAD0 = 0xEC;
    var PAD1 = 0x11;

    var _typeNumber = typeNumber;
    var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
    var _modules = null;
    var _moduleCount = 0;
    var _dataCache = null;
    var _dataList = [];

    var _this = {};

    var makeImpl = function(test, maskPattern) {

      _moduleCount = _typeNumber * 4 + 17;
      _modules = function(moduleCount) {
        var modules = new Array(moduleCount);
        for (var row = 0; row < moduleCount; row += 1) {
          modules[row] = new Array(moduleCount);
          for (var col = 0; col < moduleCount; col += 1) {
            modules[row][col] = null;
          }
        }
        return modules;
      }(_moduleCount);

      setupPositionProbePattern(0, 0);
      setupPositionProbePattern(_moduleCount - 7, 0);
      setupPositionProbePattern(0, _moduleCount - 7);
      setupPositionAdjustPattern();
      setupTimingPattern();
      setupTypeInfo(test, maskPattern);

      if (_typeNumber >= 7) {
        setupTypeNumber(test);
      }

      if (_dataCache == null) {
        _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
      }

      mapData(_dataCache, maskPattern);
    };

    var setupPositionProbePattern = function(row, col) {

      for (var r = -1; r <= 7; r += 1) {

        if (row + r <= -1 || _moduleCount <= row + r) continue;

        for (var c = -1; c <= 7; c += 1) {

          if (col + c <= -1 || _moduleCount <= col + c) continue;

          if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
              || (0 <= c && c <= 6 && (r == 0 || r == 6) )
              || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
            _modules[row + r][col + c] = true;
          } else {
            _modules[row + r][col + c] = false;
          }
        }
      }
    };

    var getBestMaskPattern = function() {

      var minLostPoint = 0;
      var pattern = 0;

      for (var i = 0; i < 8; i += 1) {

        makeImpl(true, i);

        var lostPoint = QRUtil.getLostPoint(_this);

        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }

      return pattern;
    };

    var setupTimingPattern = function() {

      for (var r = 8; r < _moduleCount - 8; r += 1) {
        if (_modules[r][6] != null) {
          continue;
        }
        _modules[r][6] = (r % 2 == 0);
      }

      for (var c = 8; c < _moduleCount - 8; c += 1) {
        if (_modules[6][c] != null) {
          continue;
        }
        _modules[6][c] = (c % 2 == 0);
      }
    };

    var setupPositionAdjustPattern = function() {

      var pos = QRUtil.getPatternPosition(_typeNumber);

      for (var i = 0; i < pos.length; i += 1) {

        for (var j = 0; j < pos.length; j += 1) {

          var row = pos[i];
          var col = pos[j];

          if (_modules[row][col] != null) {
            continue;
          }

          for (var r = -2; r <= 2; r += 1) {

            for (var c = -2; c <= 2; c += 1) {

              if (r == -2 || r == 2 || c == -2 || c == 2
                  || (r == 0 && c == 0) ) {
                _modules[row + r][col + c] = true;
              } else {
                _modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    };

    var setupTypeNumber = function(test) {

      var bits = QRUtil.getBCHTypeNumber(_typeNumber);

      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
      }

      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    };

    var setupTypeInfo = function(test, maskPattern) {

      var data = (_errorCorrectionLevel << 3) | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);

      // vertical
      for (var i = 0; i < 15; i += 1) {

        var mod = (!test && ( (bits >> i) & 1) == 1);

        if (i < 6) {
          _modules[i][8] = mod;
        } else if (i < 8) {
          _modules[i + 1][8] = mod;
        } else {
          _modules[_moduleCount - 15 + i][8] = mod;
        }
      }

      // horizontal
      for (var i = 0; i < 15; i += 1) {

        var mod = (!test && ( (bits >> i) & 1) == 1);

        if (i < 8) {
          _modules[8][_moduleCount - i - 1] = mod;
        } else if (i < 9) {
          _modules[8][15 - i - 1 + 1] = mod;
        } else {
          _modules[8][15 - i - 1] = mod;
        }
      }

      // fixed module
      _modules[_moduleCount - 8][8] = (!test);
    };

    var mapData = function(data, maskPattern) {

      var inc = -1;
      var row = _moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      var maskFunc = QRUtil.getMaskFunction(maskPattern);

      for (var col = _moduleCount - 1; col > 0; col -= 2) {

        if (col == 6) col -= 1;

        while (true) {

          for (var c = 0; c < 2; c += 1) {

            if (_modules[row][col - c] == null) {

              var dark = false;

              if (byteIndex < data.length) {
                dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
              }

              var mask = maskFunc(row, col - c);

              if (mask) {
                dark = !dark;
              }

              _modules[row][col - c] = dark;
              bitIndex -= 1;

              if (bitIndex == -1) {
                byteIndex += 1;
                bitIndex = 7;
              }
            }
          }

          row += inc;

          if (row < 0 || _moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    };

    var createBytes = function(buffer, rsBlocks) {

      var offset = 0;

      var maxDcCount = 0;
      var maxEcCount = 0;

      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);

      for (var r = 0; r < rsBlocks.length; r += 1) {

        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;

        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);

        dcdata[r] = new Array(dcCount);

        for (var i = 0; i < dcdata[r].length; i += 1) {
          dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
        }
        offset += dcCount;

        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);

        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i += 1) {
          var modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = (modIndex >= 0)? modPoly.getAt(modIndex) : 0;
        }
      }

      var totalCodeCount = 0;
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalCodeCount += rsBlocks[i].totalCount;
      }

      var data = new Array(totalCodeCount);
      var index = 0;

      for (var i = 0; i < maxDcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < dcdata[r].length) {
            data[index] = dcdata[r][i];
            index += 1;
          }
        }
      }

      for (var i = 0; i < maxEcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < ecdata[r].length) {
            data[index] = ecdata[r][i];
            index += 1;
          }
        }
      }

      return data;
    };

    var createData = function(typeNumber, errorCorrectionLevel, dataList) {

      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectionLevel);

      var buffer = qrBitBuffer();

      for (var i = 0; i < dataList.length; i += 1) {
        var data = dataList[i];
        buffer.put(data.getMode(), 4);
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
        data.write(buffer);
      }

      // calc num max data.
      var totalDataCount = 0;
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalDataCount += rsBlocks[i].dataCount;
      }

      if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw 'code length overflow. ('
          + buffer.getLengthInBits()
          + '>'
          + totalDataCount * 8
          + ')';
      }

      // end code
      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
      }

      // padding
      while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
      }

      // padding
      while (true) {

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD0, 8);

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD1, 8);
      }

      return createBytes(buffer, rsBlocks);
    };

    _this.addData = function(data, mode) {

      mode = mode || 'Byte';

      var newData = null;

      switch(mode) {
      case 'Numeric' :
        newData = qrNumber(data);
        break;
      case 'Alphanumeric' :
        newData = qrAlphaNum(data);
        break;
      case 'Byte' :
        newData = qr8BitByte(data);
        break;
      case 'Kanji' :
        newData = qrKanji(data);
        break;
      default :
        throw 'mode:' + mode;
      }

      _dataList.push(newData);
      _dataCache = null;
    };

    _this.isDark = function(row, col) {
      if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
        throw row + ',' + col;
      }
      return _modules[row][col];
    };

    _this.getModuleCount = function() {
      return _moduleCount;
    };

    _this.make = function() {
      if (_typeNumber < 1) {
        var typeNumber = 1;

        for (; typeNumber < 40; typeNumber++) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, _errorCorrectionLevel);
          var buffer = qrBitBuffer();

          for (var i = 0; i < _dataList.length; i++) {
            var data = _dataList[i];
            buffer.put(data.getMode(), 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
            data.write(buffer);
          }

          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }

          if (buffer.getLengthInBits() <= totalDataCount * 8) {
            break;
          }
        }

        _typeNumber = typeNumber;
      }

      makeImpl(false, getBestMaskPattern() );
    };

    _this.createTableTag = function(cellSize, margin) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var qrHtml = '';

      qrHtml += '<table style="';
      qrHtml += ' border-width: 0px; border-style: none;';
      qrHtml += ' border-collapse: collapse;';
      qrHtml += ' padding: 0px; margin: ' + margin + 'px;';
      qrHtml += '">';
      qrHtml += '<tbody>';

      for (var r = 0; r < _this.getModuleCount(); r += 1) {

        qrHtml += '<tr>';

        for (var c = 0; c < _this.getModuleCount(); c += 1) {
          qrHtml += '<td style="';
          qrHtml += ' border-width: 0px; border-style: none;';
          qrHtml += ' border-collapse: collapse;';
          qrHtml += ' padding: 0px; margin: 0px;';
          qrHtml += ' width: ' + cellSize + 'px;';
          qrHtml += ' height: ' + cellSize + 'px;';
          qrHtml += ' background-color: ';
          qrHtml += _this.isDark(r, c)? '#000000' : '#ffffff';
          qrHtml += ';';
          qrHtml += '"/>';
        }

        qrHtml += '</tr>';
      }

      qrHtml += '</tbody>';
      qrHtml += '</table>';

      return qrHtml;
    };

    _this.createSvgTag = function(cellSize, margin, alt, title) {

      var opts = {};
      if (typeof arguments[0] == 'object') {
        // Called by options.
        opts = arguments[0];
        // overwrite cellSize and margin.
        cellSize = opts.cellSize;
        margin = opts.margin;
        alt = opts.alt;
        title = opts.title;
      }

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      // Compose alt property surrogate
      alt = (typeof alt === 'string') ? {text: alt} : alt || {};
      alt.text = alt.text || null;
      alt.id = (alt.text) ? alt.id || 'qrcode-description' : null;

      // Compose title property surrogate
      title = (typeof title === 'string') ? {text: title} : title || {};
      title.text = title.text || null;
      title.id = (title.text) ? title.id || 'qrcode-title' : null;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var c, mc, r, mr, qrSvg='', rect;

      rect = 'l' + cellSize + ',0 0,' + cellSize +
        ' -' + cellSize + ',0 0,-' + cellSize + 'z ';

      qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
      qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : '';
      qrSvg += ' viewBox="0 0 ' + size + ' ' + size + '" ';
      qrSvg += ' preserveAspectRatio="xMinYMin meet"';
      qrSvg += (title.text || alt.text) ? ' role="img" aria-labelledby="' +
          escapeXml([title.id, alt.id].join(' ').trim() ) + '"' : '';
      qrSvg += '>';
      qrSvg += (title.text) ? '<title id="' + escapeXml(title.id) + '">' +
          escapeXml(title.text) + '</title>' : '';
      qrSvg += (alt.text) ? '<description id="' + escapeXml(alt.id) + '">' +
          escapeXml(alt.text) + '</description>' : '';
      qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
      qrSvg += '<path d="';

      for (r = 0; r < _this.getModuleCount(); r += 1) {
        mr = r * cellSize + margin;
        for (c = 0; c < _this.getModuleCount(); c += 1) {
          if (_this.isDark(r, c) ) {
            mc = c*cellSize+margin;
            qrSvg += 'M' + mc + ',' + mr + rect;
          }
        }
      }

      qrSvg += '" stroke="transparent" fill="black"/>';
      qrSvg += '</svg>';

      return qrSvg;
    };

    _this.createDataURL = function(cellSize, margin) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      return createDataURL(size, size, function(x, y) {
        if (min <= x && x < max && min <= y && y < max) {
          var c = Math.floor( (x - min) / cellSize);
          var r = Math.floor( (y - min) / cellSize);
          return _this.isDark(r, c)? 0 : 1;
        } else {
          return 1;
        }
      } );
    };

    _this.createImgTag = function(cellSize, margin, alt) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;

      var img = '';
      img += '<img';
      img += '\u0020src="';
      img += _this.createDataURL(cellSize, margin);
      img += '"';
      img += '\u0020width="';
      img += size;
      img += '"';
      img += '\u0020height="';
      img += size;
      img += '"';
      if (alt) {
        img += '\u0020alt="';
        img += escapeXml(alt);
        img += '"';
      }
      img += '/>';

      return img;
    };

    var escapeXml = function(s) {
      var escaped = '';
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charAt(i);
        switch(c) {
        case '<': escaped += '&lt;'; break;
        case '>': escaped += '&gt;'; break;
        case '&': escaped += '&amp;'; break;
        case '"': escaped += '&quot;'; break;
        default : escaped += c; break;
        }
      }
      return escaped;
    };

    var _createHalfASCII = function(margin) {
      var cellSize = 1;
      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      var y, x, r1, r2, p;

      var blocks = {
        '██': '█',
        '█ ': '▀',
        ' █': '▄',
        '  ': ' '
      };

      var blocksLastLineNoMargin = {
        '██': '▀',
        '█ ': '▀',
        ' █': ' ',
        '  ': ' '
      };

      var ascii = '';
      for (y = 0; y < size; y += 2) {
        r1 = Math.floor((y - min) / cellSize);
        r2 = Math.floor((y + 1 - min) / cellSize);
        for (x = 0; x < size; x += 1) {
          p = '█';

          if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {
            p = ' ';
          }

          if (min <= x && x < max && min <= y+1 && y+1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {
            p += ' ';
          }
          else {
            p += '█';
          }

          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.
          ascii += (margin < 1 && y+1 >= max) ? blocksLastLineNoMargin[p] : blocks[p];
        }

        ascii += '\n';
      }

      if (size % 2 && margin > 0) {
        return ascii.substring(0, ascii.length - size - 1) + Array(size+1).join('▀');
      }

      return ascii.substring(0, ascii.length-1);
    };

    _this.createASCII = function(cellSize, margin) {
      cellSize = cellSize || 1;

      if (cellSize < 2) {
        return _createHalfASCII(margin);
      }

      cellSize -= 1;
      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      var y, x, r, p;

      var white = Array(cellSize+1).join('██');
      var black = Array(cellSize+1).join('  ');

      var ascii = '';
      var line = '';
      for (y = 0; y < size; y += 1) {
        r = Math.floor( (y - min) / cellSize);
        line = '';
        for (x = 0; x < size; x += 1) {
          p = 1;

          if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {
            p = 0;
          }

          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.
          line += p ? white : black;
        }

        for (r = 0; r < cellSize; r += 1) {
          ascii += line + '\n';
        }
      }

      return ascii.substring(0, ascii.length-1);
    };

    _this.renderTo2dContext = function(context, cellSize) {
      cellSize = cellSize || 2;
      var length = _this.getModuleCount();
      for (var row = 0; row < length; row++) {
        for (var col = 0; col < length; col++) {
          context.fillStyle = _this.isDark(row, col) ? 'black' : 'white';
          context.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);
        }
      }
    }

    return _this;
  };

  //---------------------------------------------------------------------
  // qrcode.stringToBytes
  //---------------------------------------------------------------------

  qrcode.stringToBytesFuncs = {
    'default' : function(s) {
      var bytes = [];
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i);
        bytes.push(c & 0xff);
      }
      return bytes;
    }
  };

  qrcode.stringToBytes = qrcode.stringToBytesFuncs['default'];

  //---------------------------------------------------------------------
  // qrcode.createStringToBytes
  //---------------------------------------------------------------------

  /**
   * @param unicodeData base64 string of byte array.
   * [16bit Unicode],[16bit Bytes], ...
   * @param numChars
   */
  qrcode.createStringToBytes = function(unicodeData, numChars) {

    // create conversion map.

    var unicodeMap = function() {

      var bin = base64DecodeInputStream(unicodeData);
      var read = function() {
        var b = bin.read();
        if (b == -1) throw 'eof';
        return b;
      };

      var count = 0;
      var unicodeMap = {};
      while (true) {
        var b0 = bin.read();
        if (b0 == -1) break;
        var b1 = read();
        var b2 = read();
        var b3 = read();
        var k = String.fromCharCode( (b0 << 8) | b1);
        var v = (b2 << 8) | b3;
        unicodeMap[k] = v;
        count += 1;
      }
      if (count != numChars) {
        throw count + ' != ' + numChars;
      }

      return unicodeMap;
    }();

    var unknownChar = '?'.charCodeAt(0);

    return function(s) {
      var bytes = [];
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i);
        if (c < 128) {
          bytes.push(c);
        } else {
          var b = unicodeMap[s.charAt(i)];
          if (typeof b == 'number') {
            if ( (b & 0xff) == b) {
              // 1byte
              bytes.push(b);
            } else {
              // 2bytes
              bytes.push(b >>> 8);
              bytes.push(b & 0xff);
            }
          } else {
            bytes.push(unknownChar);
          }
        }
      }
      return bytes;
    };
  };

  //---------------------------------------------------------------------
  // QRMode
  //---------------------------------------------------------------------

  var QRMode = {
    MODE_NUMBER :    1 << 0,
    MODE_ALPHA_NUM : 1 << 1,
    MODE_8BIT_BYTE : 1 << 2,
    MODE_KANJI :     1 << 3
  };

  //---------------------------------------------------------------------
  // QRErrorCorrectionLevel
  //---------------------------------------------------------------------

  var QRErrorCorrectionLevel = {
    L : 1,
    M : 0,
    Q : 3,
    H : 2
  };

  //---------------------------------------------------------------------
  // QRMaskPattern
  //---------------------------------------------------------------------

  var QRMaskPattern = {
    PATTERN000 : 0,
    PATTERN001 : 1,
    PATTERN010 : 2,
    PATTERN011 : 3,
    PATTERN100 : 4,
    PATTERN101 : 5,
    PATTERN110 : 6,
    PATTERN111 : 7
  };

  //---------------------------------------------------------------------
  // QRUtil
  //---------------------------------------------------------------------

  var QRUtil = function() {

    var PATTERN_POSITION_TABLE = [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170]
    ];
    var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
    var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
    var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);

    var _this = {};

    var getBCHDigit = function(data) {
      var digit = 0;
      while (data != 0) {
        digit += 1;
        data >>>= 1;
      }
      return digit;
    };

    _this.getBCHTypeInfo = function(data) {
      var d = data << 10;
      while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
        d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15) ) );
      }
      return ( (data << 10) | d) ^ G15_MASK;
    };

    _this.getBCHTypeNumber = function(data) {
      var d = data << 12;
      while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
        d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18) ) );
      }
      return (data << 12) | d;
    };

    _this.getPatternPosition = function(typeNumber) {
      return PATTERN_POSITION_TABLE[typeNumber - 1];
    };

    _this.getMaskFunction = function(maskPattern) {

      switch (maskPattern) {

      case QRMaskPattern.PATTERN000 :
        return function(i, j) { return (i + j) % 2 == 0; };
      case QRMaskPattern.PATTERN001 :
        return function(i, j) { return i % 2 == 0; };
      case QRMaskPattern.PATTERN010 :
        return function(i, j) { return j % 3 == 0; };
      case QRMaskPattern.PATTERN011 :
        return function(i, j) { return (i + j) % 3 == 0; };
      case QRMaskPattern.PATTERN100 :
        return function(i, j) { return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0; };
      case QRMaskPattern.PATTERN101 :
        return function(i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };
      case QRMaskPattern.PATTERN110 :
        return function(i, j) { return ( (i * j) % 2 + (i * j) % 3) % 2 == 0; };
      case QRMaskPattern.PATTERN111 :
        return function(i, j) { return ( (i * j) % 3 + (i + j) % 2) % 2 == 0; };

      default :
        throw 'bad maskPattern:' + maskPattern;
      }
    };

    _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
      var a = qrPolynomial([1], 0);
      for (var i = 0; i < errorCorrectLength; i += 1) {
        a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0) );
      }
      return a;
    };

    _this.getLengthInBits = function(mode, type) {

      if (1 <= type && type < 10) {

        // 1 - 9

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 10;
        case QRMode.MODE_ALPHA_NUM : return 9;
        case QRMode.MODE_8BIT_BYTE : return 8;
        case QRMode.MODE_KANJI     : return 8;
        default :
          throw 'mode:' + mode;
        }

      } else if (type < 27) {

        // 10 - 26

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 12;
        case QRMode.MODE_ALPHA_NUM : return 11;
        case QRMode.MODE_8BIT_BYTE : return 16;
        case QRMode.MODE_KANJI     : return 10;
        default :
          throw 'mode:' + mode;
        }

      } else if (type < 41) {

        // 27 - 40

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 14;
        case QRMode.MODE_ALPHA_NUM : return 13;
        case QRMode.MODE_8BIT_BYTE : return 16;
        case QRMode.MODE_KANJI     : return 12;
        default :
          throw 'mode:' + mode;
        }

      } else {
        throw 'type:' + type;
      }
    };

    _this.getLostPoint = function(qrcode) {

      var moduleCount = qrcode.getModuleCount();

      var lostPoint = 0;

      // LEVEL1

      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount; col += 1) {

          var sameCount = 0;
          var dark = qrcode.isDark(row, col);

          for (var r = -1; r <= 1; r += 1) {

            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }

            for (var c = -1; c <= 1; c += 1) {

              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }

              if (r == 0 && c == 0) {
                continue;
              }

              if (dark == qrcode.isDark(row + r, col + c) ) {
                sameCount += 1;
              }
            }
          }

          if (sameCount > 5) {
            lostPoint += (3 + sameCount - 5);
          }
        }
      };

      // LEVEL2

      for (var row = 0; row < moduleCount - 1; row += 1) {
        for (var col = 0; col < moduleCount - 1; col += 1) {
          var count = 0;
          if (qrcode.isDark(row, col) ) count += 1;
          if (qrcode.isDark(row + 1, col) ) count += 1;
          if (qrcode.isDark(row, col + 1) ) count += 1;
          if (qrcode.isDark(row + 1, col + 1) ) count += 1;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }

      // LEVEL3

      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount - 6; col += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row, col + 1)
              &&  qrcode.isDark(row, col + 2)
              &&  qrcode.isDark(row, col + 3)
              &&  qrcode.isDark(row, col + 4)
              && !qrcode.isDark(row, col + 5)
              &&  qrcode.isDark(row, col + 6) ) {
            lostPoint += 40;
          }
        }
      }

      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount - 6; row += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row + 1, col)
              &&  qrcode.isDark(row + 2, col)
              &&  qrcode.isDark(row + 3, col)
              &&  qrcode.isDark(row + 4, col)
              && !qrcode.isDark(row + 5, col)
              &&  qrcode.isDark(row + 6, col) ) {
            lostPoint += 40;
          }
        }
      }

      // LEVEL4

      var darkCount = 0;

      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount; row += 1) {
          if (qrcode.isDark(row, col) ) {
            darkCount += 1;
          }
        }
      }

      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;

      return lostPoint;
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // QRMath
  //---------------------------------------------------------------------

  var QRMath = function() {

    var EXP_TABLE = new Array(256);
    var LOG_TABLE = new Array(256);

    // initialize tables
    for (var i = 0; i < 8; i += 1) {
      EXP_TABLE[i] = 1 << i;
    }
    for (var i = 8; i < 256; i += 1) {
      EXP_TABLE[i] = EXP_TABLE[i - 4]
        ^ EXP_TABLE[i - 5]
        ^ EXP_TABLE[i - 6]
        ^ EXP_TABLE[i - 8];
    }
    for (var i = 0; i < 255; i += 1) {
      LOG_TABLE[EXP_TABLE[i] ] = i;
    }

    var _this = {};

    _this.glog = function(n) {

      if (n < 1) {
        throw 'glog(' + n + ')';
      }

      return LOG_TABLE[n];
    };

    _this.gexp = function(n) {

      while (n < 0) {
        n += 255;
      }

      while (n >= 256) {
        n -= 255;
      }

      return EXP_TABLE[n];
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // qrPolynomial
  //---------------------------------------------------------------------

  function qrPolynomial(num, shift) {

    if (typeof num.length == 'undefined') {
      throw num.length + '/' + shift;
    }

    var _num = function() {
      var offset = 0;
      while (offset < num.length && num[offset] == 0) {
        offset += 1;
      }
      var _num = new Array(num.length - offset + shift);
      for (var i = 0; i < num.length - offset; i += 1) {
        _num[i] = num[i + offset];
      }
      return _num;
    }();

    var _this = {};

    _this.getAt = function(index) {
      return _num[index];
    };

    _this.getLength = function() {
      return _num.length;
    };

    _this.multiply = function(e) {

      var num = new Array(_this.getLength() + e.getLength() - 1);

      for (var i = 0; i < _this.getLength(); i += 1) {
        for (var j = 0; j < e.getLength(); j += 1) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i) ) + QRMath.glog(e.getAt(j) ) );
        }
      }

      return qrPolynomial(num, 0);
    };

    _this.mod = function(e) {

      if (_this.getLength() - e.getLength() < 0) {
        return _this;
      }

      var ratio = QRMath.glog(_this.getAt(0) ) - QRMath.glog(e.getAt(0) );

      var num = new Array(_this.getLength() );
      for (var i = 0; i < _this.getLength(); i += 1) {
        num[i] = _this.getAt(i);
      }

      for (var i = 0; i < e.getLength(); i += 1) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i) ) + ratio);
      }

      // recursive call
      return qrPolynomial(num, 0).mod(e);
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // QRRSBlock
  //---------------------------------------------------------------------

  var QRRSBlock = function() {

    var RS_BLOCK_TABLE = [

      // L
      // M
      // Q
      // H

      // 1
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],

      // 2
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],

      // 3
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],

      // 4
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],

      // 5
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],

      // 6
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],

      // 7
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],

      // 8
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],

      // 9
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],

      // 10
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],

      // 11
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],

      // 12
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],

      // 13
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],

      // 14
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],

      // 15
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12, 7, 37, 13],

      // 16
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],

      // 17
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],

      // 18
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],

      // 19
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],

      // 20
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],

      // 21
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],

      // 22
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],

      // 23
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],

      // 24
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],

      // 25
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],

      // 26
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],

      // 27
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],

      // 28
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],

      // 29
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],

      // 30
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],

      // 31
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],

      // 32
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],

      // 33
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],

      // 34
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],

      // 35
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],

      // 36
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],

      // 37
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],

      // 38
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],

      // 39
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],

      // 40
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ];

    var qrRSBlock = function(totalCount, dataCount) {
      var _this = {};
      _this.totalCount = totalCount;
      _this.dataCount = dataCount;
      return _this;
    };

    var _this = {};

    var getRsBlockTable = function(typeNumber, errorCorrectionLevel) {

      switch(errorCorrectionLevel) {
      case QRErrorCorrectionLevel.L :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectionLevel.M :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectionLevel.Q :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectionLevel.H :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default :
        return undefined;
      }
    };

    _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {

      var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);

      if (typeof rsBlock == 'undefined') {
        throw 'bad rs block @ typeNumber:' + typeNumber +
            '/errorCorrectionLevel:' + errorCorrectionLevel;
      }

      var length = rsBlock.length / 3;

      var list = [];

      for (var i = 0; i < length; i += 1) {

        var count = rsBlock[i * 3 + 0];
        var totalCount = rsBlock[i * 3 + 1];
        var dataCount = rsBlock[i * 3 + 2];

        for (var j = 0; j < count; j += 1) {
          list.push(qrRSBlock(totalCount, dataCount) );
        }
      }

      return list;
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // qrBitBuffer
  //---------------------------------------------------------------------

  var qrBitBuffer = function() {

    var _buffer = [];
    var _length = 0;

    var _this = {};

    _this.getBuffer = function() {
      return _buffer;
    };

    _this.getAt = function(index) {
      var bufIndex = Math.floor(index / 8);
      return ( (_buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
    };

    _this.put = function(num, length) {
      for (var i = 0; i < length; i += 1) {
        _this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
      }
    };

    _this.getLengthInBits = function() {
      return _length;
    };

    _this.putBit = function(bit) {

      var bufIndex = Math.floor(_length / 8);
      if (_buffer.length <= bufIndex) {
        _buffer.push(0);
      }

      if (bit) {
        _buffer[bufIndex] |= (0x80 >>> (_length % 8) );
      }

      _length += 1;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrNumber
  //---------------------------------------------------------------------

  var qrNumber = function(data) {

    var _mode = QRMode.MODE_NUMBER;
    var _data = data;

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _data.length;
    };

    _this.write = function(buffer) {

      var data = _data;

      var i = 0;

      while (i + 2 < data.length) {
        buffer.put(strToNum(data.substring(i, i + 3) ), 10);
        i += 3;
      }

      if (i < data.length) {
        if (data.length - i == 1) {
          buffer.put(strToNum(data.substring(i, i + 1) ), 4);
        } else if (data.length - i == 2) {
          buffer.put(strToNum(data.substring(i, i + 2) ), 7);
        }
      }
    };

    var strToNum = function(s) {
      var num = 0;
      for (var i = 0; i < s.length; i += 1) {
        num = num * 10 + chatToNum(s.charAt(i) );
      }
      return num;
    };

    var chatToNum = function(c) {
      if ('0' <= c && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0);
      }
      throw 'illegal char :' + c;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrAlphaNum
  //---------------------------------------------------------------------

  var qrAlphaNum = function(data) {

    var _mode = QRMode.MODE_ALPHA_NUM;
    var _data = data;

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _data.length;
    };

    _this.write = function(buffer) {

      var s = _data;

      var i = 0;

      while (i + 1 < s.length) {
        buffer.put(
          getCode(s.charAt(i) ) * 45 +
          getCode(s.charAt(i + 1) ), 11);
        i += 2;
      }

      if (i < s.length) {
        buffer.put(getCode(s.charAt(i) ), 6);
      }
    };

    var getCode = function(c) {

      if ('0' <= c && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0);
      } else if ('A' <= c && c <= 'Z') {
        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
      } else {
        switch (c) {
        case ' ' : return 36;
        case '$' : return 37;
        case '%' : return 38;
        case '*' : return 39;
        case '+' : return 40;
        case '-' : return 41;
        case '.' : return 42;
        case '/' : return 43;
        case ':' : return 44;
        default :
          throw 'illegal char :' + c;
        }
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qr8BitByte
  //---------------------------------------------------------------------

  var qr8BitByte = function(data) {

    var _mode = QRMode.MODE_8BIT_BYTE;
    var _data = data;
    var _bytes = qrcode.stringToBytes(data);

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _bytes.length;
    };

    _this.write = function(buffer) {
      for (var i = 0; i < _bytes.length; i += 1) {
        buffer.put(_bytes[i], 8);
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrKanji
  //---------------------------------------------------------------------

  var qrKanji = function(data) {

    var _mode = QRMode.MODE_KANJI;
    var _data = data;

    var stringToBytes = qrcode.stringToBytesFuncs['SJIS'];
    if (!stringToBytes) {
      throw 'sjis not supported.';
    }
    !function(c, code) {
      // self test for sjis support.
      var test = stringToBytes(c);
      if (test.length != 2 || ( (test[0] << 8) | test[1]) != code) {
        throw 'sjis not supported.';
      }
    }('\u53cb', 0x9746);

    var _bytes = stringToBytes(data);

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return ~~(_bytes.length / 2);
    };

    _this.write = function(buffer) {

      var data = _bytes;

      var i = 0;

      while (i + 1 < data.length) {

        var c = ( (0xff & data[i]) << 8) | (0xff & data[i + 1]);

        if (0x8140 <= c && c <= 0x9FFC) {
          c -= 0x8140;
        } else if (0xE040 <= c && c <= 0xEBBF) {
          c -= 0xC140;
        } else {
          throw 'illegal char at ' + (i + 1) + '/' + c;
        }

        c = ( (c >>> 8) & 0xff) * 0xC0 + (c & 0xff);

        buffer.put(c, 13);

        i += 2;
      }

      if (i < data.length) {
        throw 'illegal char at ' + (i + 1);
      }
    };

    return _this;
  };

  //=====================================================================
  // GIF Support etc.
  //

  //---------------------------------------------------------------------
  // byteArrayOutputStream
  //---------------------------------------------------------------------

  var byteArrayOutputStream = function() {

    var _bytes = [];

    var _this = {};

    _this.writeByte = function(b) {
      _bytes.push(b & 0xff);
    };

    _this.writeShort = function(i) {
      _this.writeByte(i);
      _this.writeByte(i >>> 8);
    };

    _this.writeBytes = function(b, off, len) {
      off = off || 0;
      len = len || b.length;
      for (var i = 0; i < len; i += 1) {
        _this.writeByte(b[i + off]);
      }
    };

    _this.writeString = function(s) {
      for (var i = 0; i < s.length; i += 1) {
        _this.writeByte(s.charCodeAt(i) );
      }
    };

    _this.toByteArray = function() {
      return _bytes;
    };

    _this.toString = function() {
      var s = '';
      s += '[';
      for (var i = 0; i < _bytes.length; i += 1) {
        if (i > 0) {
          s += ',';
        }
        s += _bytes[i];
      }
      s += ']';
      return s;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // base64EncodeOutputStream
  //---------------------------------------------------------------------

  var base64EncodeOutputStream = function() {

    var _buffer = 0;
    var _buflen = 0;
    var _length = 0;
    var _base64 = '';

    var _this = {};

    var writeEncoded = function(b) {
      _base64 += String.fromCharCode(encode(b & 0x3f) );
    };

    var encode = function(n) {
      if (n < 0) {
        // error.
      } else if (n < 26) {
        return 0x41 + n;
      } else if (n < 52) {
        return 0x61 + (n - 26);
      } else if (n < 62) {
        return 0x30 + (n - 52);
      } else if (n == 62) {
        return 0x2b;
      } else if (n == 63) {
        return 0x2f;
      }
      throw 'n:' + n;
    };

    _this.writeByte = function(n) {

      _buffer = (_buffer << 8) | (n & 0xff);
      _buflen += 8;
      _length += 1;

      while (_buflen >= 6) {
        writeEncoded(_buffer >>> (_buflen - 6) );
        _buflen -= 6;
      }
    };

    _this.flush = function() {

      if (_buflen > 0) {
        writeEncoded(_buffer << (6 - _buflen) );
        _buffer = 0;
        _buflen = 0;
      }

      if (_length % 3 != 0) {
        // padding
        var padlen = 3 - _length % 3;
        for (var i = 0; i < padlen; i += 1) {
          _base64 += '=';
        }
      }
    };

    _this.toString = function() {
      return _base64;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // base64DecodeInputStream
  //---------------------------------------------------------------------

  var base64DecodeInputStream = function(str) {

    var _str = str;
    var _pos = 0;
    var _buffer = 0;
    var _buflen = 0;

    var _this = {};

    _this.read = function() {

      while (_buflen < 8) {

        if (_pos >= _str.length) {
          if (_buflen == 0) {
            return -1;
          }
          throw 'unexpected end of file./' + _buflen;
        }

        var c = _str.charAt(_pos);
        _pos += 1;

        if (c == '=') {
          _buflen = 0;
          return -1;
        } else if (c.match(/^\s$/) ) {
          // ignore if whitespace.
          continue;
        }

        _buffer = (_buffer << 6) | decode(c.charCodeAt(0) );
        _buflen += 6;
      }

      var n = (_buffer >>> (_buflen - 8) ) & 0xff;
      _buflen -= 8;
      return n;
    };

    var decode = function(c) {
      if (0x41 <= c && c <= 0x5a) {
        return c - 0x41;
      } else if (0x61 <= c && c <= 0x7a) {
        return c - 0x61 + 26;
      } else if (0x30 <= c && c <= 0x39) {
        return c - 0x30 + 52;
      } else if (c == 0x2b) {
        return 62;
      } else if (c == 0x2f) {
        return 63;
      } else {
        throw 'c:' + c;
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // gifImage (B/W)
  //---------------------------------------------------------------------

  var gifImage = function(width, height) {

    var _width = width;
    var _height = height;
    var _data = new Array(width * height);

    var _this = {};

    _this.setPixel = function(x, y, pixel) {
      _data[y * _width + x] = pixel;
    };

    _this.write = function(out) {

      //---------------------------------
      // GIF Signature

      out.writeString('GIF87a');

      //---------------------------------
      // Screen Descriptor

      out.writeShort(_width);
      out.writeShort(_height);

      out.writeByte(0x80); // 2bit
      out.writeByte(0);
      out.writeByte(0);

      //---------------------------------
      // Global Color Map

      // black
      out.writeByte(0x00);
      out.writeByte(0x00);
      out.writeByte(0x00);

      // white
      out.writeByte(0xff);
      out.writeByte(0xff);
      out.writeByte(0xff);

      //---------------------------------
      // Image Descriptor

      out.writeString(',');
      out.writeShort(0);
      out.writeShort(0);
      out.writeShort(_width);
      out.writeShort(_height);
      out.writeByte(0);

      //---------------------------------
      // Local Color Map

      //---------------------------------
      // Raster Data

      var lzwMinCodeSize = 2;
      var raster = getLZWRaster(lzwMinCodeSize);

      out.writeByte(lzwMinCodeSize);

      var offset = 0;

      while (raster.length - offset > 255) {
        out.writeByte(255);
        out.writeBytes(raster, offset, 255);
        offset += 255;
      }

      out.writeByte(raster.length - offset);
      out.writeBytes(raster, offset, raster.length - offset);
      out.writeByte(0x00);

      //---------------------------------
      // GIF Terminator
      out.writeString(';');
    };

    var bitOutputStream = function(out) {

      var _out = out;
      var _bitLength = 0;
      var _bitBuffer = 0;

      var _this = {};

      _this.write = function(data, length) {

        if ( (data >>> length) != 0) {
          throw 'length over';
        }

        while (_bitLength + length >= 8) {
          _out.writeByte(0xff & ( (data << _bitLength) | _bitBuffer) );
          length -= (8 - _bitLength);
          data >>>= (8 - _bitLength);
          _bitBuffer = 0;
          _bitLength = 0;
        }

        _bitBuffer = (data << _bitLength) | _bitBuffer;
        _bitLength = _bitLength + length;
      };

      _this.flush = function() {
        if (_bitLength > 0) {
          _out.writeByte(_bitBuffer);
        }
      };

      return _this;
    };

    var getLZWRaster = function(lzwMinCodeSize) {

      var clearCode = 1 << lzwMinCodeSize;
      var endCode = (1 << lzwMinCodeSize) + 1;
      var bitLength = lzwMinCodeSize + 1;

      // Setup LZWTable
      var table = lzwTable();

      for (var i = 0; i < clearCode; i += 1) {
        table.add(String.fromCharCode(i) );
      }
      table.add(String.fromCharCode(clearCode) );
      table.add(String.fromCharCode(endCode) );

      var byteOut = byteArrayOutputStream();
      var bitOut = bitOutputStream(byteOut);

      // clear code
      bitOut.write(clearCode, bitLength);

      var dataIndex = 0;

      var s = String.fromCharCode(_data[dataIndex]);
      dataIndex += 1;

      while (dataIndex < _data.length) {

        var c = String.fromCharCode(_data[dataIndex]);
        dataIndex += 1;

        if (table.contains(s + c) ) {

          s = s + c;

        } else {

          bitOut.write(table.indexOf(s), bitLength);

          if (table.size() < 0xfff) {

            if (table.size() == (1 << bitLength) ) {
              bitLength += 1;
            }

            table.add(s + c);
          }

          s = c;
        }
      }

      bitOut.write(table.indexOf(s), bitLength);

      // end code
      bitOut.write(endCode, bitLength);

      bitOut.flush();

      return byteOut.toByteArray();
    };

    var lzwTable = function() {

      var _map = {};
      var _size = 0;

      var _this = {};

      _this.add = function(key) {
        if (_this.contains(key) ) {
          throw 'dup key:' + key;
        }
        _map[key] = _size;
        _size += 1;
      };

      _this.size = function() {
        return _size;
      };

      _this.indexOf = function(key) {
        return _map[key];
      };

      _this.contains = function(key) {
        return typeof _map[key] != 'undefined';
      };

      return _this;
    };

    return _this;
  };

  var createDataURL = function(width, height, getPixel) {
    var gif = gifImage(width, height);
    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        gif.setPixel(x, y, getPixel(x, y) );
      }
    }

    var b = byteArrayOutputStream();
    gif.write(b);

    var base64 = base64EncodeOutputStream();
    var bytes = b.toByteArray();
    for (var i = 0; i < bytes.length; i += 1) {
      base64.writeByte(bytes[i]);
    }
    base64.flush();

    return 'data:image/gif;base64,' + base64;
  };

  //---------------------------------------------------------------------
  // returns qrcode function.

  return qrcode;
}();

// multibyte support
!function() {

  qrcode.stringToBytesFuncs['UTF-8'] = function(s) {
    // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
    function toUTF8Array(str) {
      var utf8 = [];
      for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6),
              0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(0xe0 | (charcode >> 12),
              0x80 | ((charcode>>6) & 0x3f),
              0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
          i++;
          // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves
          charcode = 0x10000 + (((charcode & 0x3ff)<<10)
            | (str.charCodeAt(i) & 0x3ff));
          utf8.push(0xf0 | (charcode >>18),
              0x80 | ((charcode>>12) & 0x3f),
              0x80 | ((charcode>>6) & 0x3f),
              0x80 | (charcode & 0x3f));
        }
      }
      return utf8;
    }
    return toUTF8Array(s);
  };

}();

(function (factory) {
  if (typeof define === 'function' && define.amd) {
      define([], factory);
  } else if (typeof exports === 'object') {
      module.exports = factory();
  }
}(function () {
    return qrcode;
}));

function H(){return W.fbHubHost||null;}
function shell(){try{return (W.pywebview&&W.pywebview.api)||null;}catch(e){return null;}}
function can(n){var a=shell();return !!(a&&typeof a[n]==="function");}
function mk(t,c,html){var e=D.createElement(t);if(c)e.className=c;if(html!=null)e.innerHTML=html;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function key(cls,label,fn){var b=mk("button","f-btn "+cls);b.type="button";b.textContent=label;b.onclick=fn;return b;}
function chip(cls,t){return mk("span","f-chip"+(cls?" "+cls:""),esc(t));}
function toast(m){var h=H();if(h)h.toast(m);}
function fail(e){var h=H();if(h)h.fail(e);}
function slugOf(r){var x=String(r.slug||r.name||"app").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60);return /^[a-z0-9]/.test(x)?x:"app-"+x;}
function b64(u8){var s="",CH=0x8000;for(var i=0;i<u8.length;i+=CH)s+=String.fromCharCode.apply(null,u8.subarray(i,i+CH));return btoa(s);}
function unb64(s){var bin=atob(String(s||"")),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u;}
function copy(text,el){try{navigator.clipboard.writeText(text).then(function(){toast("Address copied.");},sel);}catch(e){sel();}
  function sel(){try{var r=D.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);toast("Address selected: copy it.");}catch(_){}}}
/* a code the iPhone's camera reads, drawn as squares (dark on a light ground, by day and by night) */
function qrSvg(text){try{var q=qrcode(0,"M");q.addData(text);q.make();var n=q.getModuleCount(),p=[];
  for(var r=0;r<n;r++)for(var c=0;c<n;c++)if(q.isDark(r,c))p.push("M"+c+" "+r+"h1v1h-1z");
  return '<svg viewBox="-2 -2 '+(n+4)+" "+(n+4)+'" shape-rendering="crispEdges" role="img" aria-label="A code for '+esc(text)+'"><rect x="-2" y="-2" width="'+(n+4)+'" height="'+(n+4)+'" fill="#fff"/><path d="'+p.join("")+'" fill="#221a2e"/></svg>';}catch(e){return "";}}
var ICON={inside:'<path d="M12 2.8l7.5 4.3v9.8L12 21.2l-7.5-4.3V7.1z"/><path d="M8.5 12l2.4 2.4 4.6-4.8"/>',
  home:'<rect x="4" y="3" width="16" height="18" rx="3"/><rect x="7.5" y="6.5" width="3.5" height="3.5" rx="1"/><rect x="13" y="6.5" width="3.5" height="3.5" rx="1"/><rect x="7.5" y="12" width="3.5" height="3.5" rx="1"/><path d="M14.75 12v3.5M13 13.75h3.5"/>',
  free:'<rect x="5.5" y="2.5" width="13" height="19" rx="3"/><path d="M10.5 5.3h3"/><path d="M9.5 13.2l1.8 1.8 3.4-3.6"/>',
  paid:'<rect x="3.5" y="7" width="17" height="12" rx="2"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M3.5 12h17"/>'};
function way(box,o){var w=mk("div","r316-way");w.setAttribute("aria-expanded",o.open?"true":"false");
  var hd=mk("button","r316-wh");hd.type="button";
  hd.innerHTML='<span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICON[o.ic]+'</svg></span><span class="tx"><b>'+esc(o.title)+"</b><span>"+esc(o.sub)+'</span></span>';
  hd.appendChild(chip(o.chip[0],o.chip[1]));hd.appendChild(mk("span","chev","›"));
  var bd=mk("div","r316-wb");bd.hidden=!o.open;var done=false;
  function fill(){if(done)return;done=true;try{o.body(bd);}catch(e){fail(e);}}
  if(o.open)fill();
  hd.onclick=function(){var on=w.getAttribute("aria-expanded")!=="true";w.setAttribute("aria-expanded",String(on));bd.hidden=!on;if(on)fill();};
  w.appendChild(hd);w.appendChild(bd);box.appendChild(w);return w;}
function opt(box,title,ch){var o=mk("div","r316-opt"),oh=mk("div","oh");oh.appendChild(mk("b",null,esc(title)));if(ch)oh.appendChild(chip(ch[0],ch[1]));o.appendChild(oh);box.appendChild(o);return o;}
function para(box,t,cls){var p=mk("p",cls||null,esc(t));box.appendChild(p);return p;}
function steps(box,list){var ol=mk("ol");list.forEach(function(t){ol.appendChild(mk("li",null,esc(t)));});box.appendChild(ol);}
function keys(box){var k=mk("div","r316-keys");box.appendChild(k);return k;}

/* ---------- 1. inside Ingenium: sent to her paired devices, or as a file ---------- */
function sendTo(r,dev,row){var h=H(),a=shell();row.querySelector(".st").textContent="Sending…";
  return IngShip.onePage(r.id,{quiet:true,ship:"send"}).then(function(x){var bytes=x.bytes||new TextEncoder().encode(x.html||"");  /* 7.67: ship, so its code is scrambled (modules/r356.js) */
    return a.apps_send(slugOf(r),r.name,(h&&h.headTag?h.headTag(r):"")||"",b64(bytes),[dev.id]);}).then(function(res){
    if(!res||!res.ok)throw new Error(res&&res.error||"it could not be sent");
    row.querySelector(".st").textContent="Waiting for it";toast(r.name+" waits for "+(dev.name||"the device")+": Ingenium there offers it in Fabrica, Your apps.");},
    function(e){row.querySelector(".st").textContent="";fail(e);});}
function devRows(r,box){var a=shell();var list=mk("div","r316-devs");box.appendChild(list);list.appendChild(mk("p","r316-note","Looking for your devices…"));
  Promise.all([Promise.resolve(a.share_status()),can("apps_outbox")?Promise.resolve(a.apps_outbox()):null]).then(function(x){var st=x[0]||{},ob=x[1]||{apps:[]},devs=(st.devices||[]).filter(function(d){return d&&d.id;});
    list.innerHTML="";
    if(!devs.length){list.appendChild(mk("p","r316-note","No iPhone or iPad has paired with this computer yet. On the device: Settings, Your devices, Find my computers, then type this computer's code once."));return;}
    var mine=(ob.apps||[]).filter(function(x){return x.slug===slugOf(r);})[0]||null;
    devs.forEach(function(d){var row=mk("div","r316-dev"),fresh=(d.minutes_ago||0)<15;
      row.appendChild(mk("span","dot"+(fresh?"":" off")));row.appendChild(mk("b",null,esc(d.name||"A device")));
      var got=mine&&mine.got&&mine.got[d.id],waits=mine&&!got&&(!mine.to||!mine.to.length||mine.to.indexOf(d.id)>=0);
      row.appendChild(mk("span","st",got?"Kept there":waits?"Waiting for it":fresh?"Seen just now":"Seen "+(d.minutes_ago>=1440?Math.round(d.minutes_ago/1440)+" days ago":d.minutes_ago>=60?Math.round(d.minutes_ago/60)+" hours ago":d.minutes_ago+" minutes ago")));
      row.appendChild(key("c-lav sm",fresh?"Send":"Send when it wakes",function(){sendTo(r,d,row);}));list.appendChild(row);});},
    function(e){list.innerHTML="";list.appendChild(mk("p","r316-note","Your devices could not be read here ("+(e&&e.message||e)+")."));});}
function bodyInside(r){return function(b){
  var o1=opt(b,"Send to my devices",["","Paired on Wi-Fi"]);
  if(can("apps_send")&&can("share_status")){para(o1,"Your devices paired with this computer, as for lending models. It waits here until Ingenium on the device takes it, and stays there, offline too.");devRows(r,o1);}
  else para(o1,"Send it from Fabrica on the computer your iPhone and iPad pair with (Settings, Your devices). Here, make the file below.","r316-note");
  var o2=opt(b,"Or as a file",["","Anywhere"]);
  para(o2,"One file with the whole app. Send it by AirDrop, Messages or Files; then, on the iPhone or iPad: Ingenium, Fabrica, Your apps, Bring one in, and choose it. Run it opens it.");
  keys(o2).appendChild(key("c-lav","Make the file",function(){H().makeOne(r,"page");}));};}

/* ---------- 2. on the Home Screen: from her Mac first, GitHub Pages the backup ---------- */
function webFiles(r){var h=H();return IngShip.webApp(r.id,{pkg:h.pkgOf(r)}).then(function(x){var z=IngRepo.core.unzip(x.bytes),ents=z.entries.filter(function(e){return !e.dir;});
  var first=ents.length&&ents[0].name.indexOf("/")>0?ents[0].name.split("/")[0]+"/":"",common=first&&ents.every(function(e){return e.name.indexOf(first)===0;})?first:"";
  var out=[],chain=Promise.resolve();ents.forEach(function(e){chain=chain.then(function(){return IngRepo.core.unzipData(x.bytes,e).then(function(u8){out.push({path:e.name.slice(common.length),data:u8});});});});
  return chain.then(function(){if(!out.some(function(f){return /^index\.html?$/i.test(f.path);})){var pg=out.filter(function(f){return /\.html?$/i.test(f.path)&&f.path.indexOf("/")<0;})[0];if(pg)out.push({path:"index.html",data:pg.data});}return out;});});}
function addrBox(box,url){var a=mk("div","r316-addr");var q=mk("div","r316-qr",qrSvg(url));q.title="Point the iPhone's camera here";a.appendChild(q);
  var c=mk("div","r316-ac"),code=mk("code",null,esc(url));c.appendChild(code);var k=keys(c);a.appendChild(c);box.appendChild(a);return {wrap:a,keys:k,code:code};}
function bodyHome(r){return function(b){
  var o1=opt(b,"From my Mac",["","In-house, the default"]);
  if(can("apps_serve")){para(o1,"Ingenium on this computer serves it on your home Wi-Fi.");var area=mk("div");o1.appendChild(area);
    function show(urls){area.innerHTML="";if(!urls||!urls.length){keys(area).appendChild(key("c-sky","Serve it now",serve));return;}
      var ab=addrBox(area,urls[0]);ab.keys.appendChild(key("c-sky","Copy the address",function(){copy(urls[0],ab.code);}));ab.keys.appendChild(key("c-sky","Serve this version",serve));
      ab.keys.appendChild(key("quiet sm","Stop serving",function(){Promise.resolve(shell().apps_unserve(slugOf(r))).then(function(){show(null);toast(r.name+" is no longer served from this computer.");},fail);}));
      if(urls.length>1)para(area,"If Safari does not open it, try "+urls.slice(1).join(" or ")+".","r316-note");}
    function serve(){var h=H();h.busy("Serving "+r.name+" from this computer…");webFiles(r).then(function(files){return shell().apps_serve(slugOf(r),r.name,files.map(function(f){return {path:f.path,b64:b64(f.data)};}));}).then(function(res){h.unbusy();
      if(!res||!res.ok)throw new Error(res&&res.error||"it could not be served");if(!res.running)throw new Error("this computer could not open its network port"+(res.error?" ("+res.error+")":""));show(res.urls);toast(r.name+" is served on your home Wi-Fi. Open the address in Safari on the iPhone.");},function(e){h.unbusy();fail(e);});}
    Promise.resolve(can("apps_served")?shell().apps_served():null).then(function(x){var mine=x&&(x.apps||[]).filter(function(a){return a.slug===slugOf(r);})[0];show(mine&&x.running?mine.urls:null);},function(){show(null);});
    steps(o1,["On the iPhone, on the same Wi-Fi, open the address in Safari (or point the camera at the code).","Press Share, then Add to Home Screen.","It opens from its icon while this computer is on and the iPhone is at home."]);
    para(o1,"Away from home, or with the computer asleep, it does not open: an iPhone keeps an app offline only from a secure (https) address.","r316-note");}
  else para(o1,"Ingenium on your Mac serves it: open this app in Fabrica there, and choose this way.","r316-note");
  var o2=opt(b,"On GitHub Pages",["warn","The backup"]);
  para(o2,"A secure address, so it works offline anywhere once added. On a free GitHub plan the app's files are public.");
  var L=linkOf(r);if(L)para(o2,"To "+L.owner+"/"+L.repo+", on its branch gh-pages.","r316-note");else para(o2,"Link it to its repository on GitHub first, in Fabrica's GitHub part.","r316-note");
  var res=mk("div");o2.appendChild(res);
  keys(o2).appendChild(key("c-amb","Publish on GitHub Pages",function(){var h=H();h.busy("Publishing "+r.name+" on GitHub Pages…");pages(r,function(t){h.busy(t);}).then(function(url){h.unbusy();res.innerHTML="";var ab=addrBox(res,url);
    ab.keys.appendChild(key("c-amb","Copy the address",function(){copy(url,ab.code);}));toast("Published. GitHub may take a minute or two before the address opens.");},function(e){h.unbusy();fail(e);});}));};}
function linkOf(r){try{var R=W.state&&state.fabrica&&state.fabrica.remote;var L=R&&R[r.id];return L&&L.owner&&L.repo?L:null;}catch(e){return null;}}
/* the web app's files on the repository's branch gh-pages (GitHub's own interface: blobs, a tree, a commit, the branch), then Pages
   switched on for that branch if it is not yet */
function pages(r,prog){var G=W.fbGitHub,L=linkOf(r);
  if(!G)return Promise.reject(new Error("GitHub is not in this copy of Ingenium"));
  if(!(W.state&&state.github&&state.github.token))return Promise.reject(new Error("Sign in to GitHub first, in Fabrica's GitHub part"));
  if(!L)return Promise.reject(new Error("Link this app to its repository on GitHub first, in Fabrica's GitHub part"));
  var R="/repos/"+encodeURIComponent(L.owner)+"/"+encodeURIComponent(L.repo),api=G.api;
  return webFiles(r).then(function(files){files=files.concat([{path:".nojekyll",data:new Uint8Array(0)}]);var tree=[],chain=Promise.resolve(),n=0;
    files.forEach(function(f){chain=chain.then(function(){n++;prog("Sending file "+n+" of "+files.length+"…");return api(R+"/git/blobs",{method:"POST",body:{content:b64(f.data),encoding:"base64"}}).then(function(x){tree.push({path:f.path,mode:"100644",type:"blob",sha:x.data.sha});});});});
    return chain.then(function(){return api(R+"/git/trees",{method:"POST",body:{tree:tree}});});}).then(function(t){
    return api(R+"/git/ref/heads/gh-pages").then(function(x){return x.data.object.sha;},function(e){if(e&&e.status===404)return null;throw e;}).then(function(parent){
      var h=H(),v=h&&h.headTag?h.headTag(r):"";
      return api(R+"/git/commits",{method:"POST",body:{message:"Published from Fabrica"+(v?": "+v:""),tree:t.data.sha,parents:parent?[parent]:[]}}).then(function(c){
        return parent?api(R+"/git/refs/heads/gh-pages",{method:"PATCH",body:{sha:c.data.sha,force:true}}):api(R+"/git/refs",{method:"POST",body:{ref:"refs/heads/gh-pages",sha:c.data.sha}});});});}).then(function(){
    prog("Switching GitHub Pages on…");
    return api(R+"/pages").then(function(x){return x.data;},function(e){if(e&&e.status===404)return api(R+"/pages",{method:"POST",body:{source:{branch:"gh-pages",path:"/"}}}).then(function(x){return x.data;});throw e;});}).then(function(p){
    return (p&&p.html_url)||("https://"+String(L.owner).toLowerCase()+".github.io/"+L.repo+"/");});}

/* ---------- 3 and 4. an app of its own: the IPA, and the iPhone build kit ---------- */
function makeIpa(r){var h=H();if(!h.targetHere("ipa")){toast("This build of Ingenium carries no iPhone and iPad shell. Use the build kit with Xcode, or a way above.");return;}h.makeOne(r,"ipa");}
function bodyFree(r){return function(b){var o=opt(b,"The IPA, made here",["","An .ipa file"]);
  keys(o).appendChild(key("pri","Make the IPA",function(){makeIpa(r);}));
  steps(o,["On your Mac, open Sideloadly and join the iPhone by cable (the first time).","Drop the IPA on Sideloadly, and sign in with your Apple ID.","On the iPhone, once: Settings, General, VPN and Device Management, trust your Apple ID; then Settings, Privacy and Security, Developer Mode."]);
  var f=mk("div","r316-facts");f.appendChild(chip("warn","Lasts 7 days"));f.appendChild(chip("","Up to 3 such apps"));f.appendChild(chip("ok","Sideloadly can renew it on Wi-Fi"));o.appendChild(f);
  para(o,"Apple's limits for a free Apple ID, as published guides gave them in November 2026; Apple may change them.","r316-note");};}
function bodyPaid(r){return function(b){
  var o1=opt(b,"What it takes",["","Apple Developer Program"]);para(o1,"About US$99 a year (check the price on Apple's site). Nothing here needs it until then; these keys wait.");
  var o2=opt(b,"Sideloadly, with your paid Apple ID",["ok","Lasts a year"]);para(o2,"The same IPA as the free way, signed with the Apple ID of your developer account.");keys(o2).appendChild(key("c-emr","Make the IPA",function(){makeIpa(r);}));
  var o3=opt(b,"Xcode on your Mac mini",["","With your team"]);para(o3,"The iPhone and iPad build kit: open it in Xcode, choose your team, and run it on the iPhone or send it to TestFlight.");
  keys(o3).appendChild(key("c-emr","Make the kit",function(){var h=H();if(!h.targetHere("kits")){toast("The kits are made on a computer: this build of Ingenium carries no kit store.");return;}h.makeOne(r,"kits",{kits:["iphone","ipad"]});}));};}

/* ---------- the sheet ---------- */
function open(r){var h=H();if(!h||!r)return;if(!r.head){toast("Keep a first version first.");return;}
  var sh=h.sheet(r.name+" on your iPhone and iPad","Four ways. The first two need nothing from Apple. The last two make an app of its own, with its own icon, signed with an Apple ID.");
  sh.box.classList.add("r316");var box=mk("div","r316-ways");sh.box.appendChild(box);
  way(box,{ic:"inside",title:"Inside Ingenium",sub:"Kept in Fabrica's Your apps on your iPhone or iPad, where Run it opens it. Nothing to install.",chip:["ok","Nothing from Apple"],open:true,body:bodyInside(r)});
  way(box,{ic:"home",title:"On the Home Screen",sub:"Safari adds it with its own icon, and it opens full screen like an app.",chip:["ok","From your Mac"],body:bodyHome(r)});
  way(box,{ic:"free",title:"With your Apple ID (free)",sub:"An app of its own, installed by Sideloadly or AltStore with your Apple ID.",chip:["warn","7 days"],body:bodyFree(r)});
  way(box,{ic:"paid",title:"With a developer account (paid)",sub:"For a year at a time, with no limit on how many apps.",chip:["","When you have one"],body:bodyPaid(r)});
  return sh;}

/* ---------- on the iPhone or iPad: what her computer sent, offered in Fabrica's Your apps ---------- */
var WAIT=[],SKIP={},KEPT={},LAST=0,BUSY=false;
function comps(){try{return W.IngLend?(IngLend.state().computers||[]):[];}catch(e){return [];}}
function check(force){if(BUSY||!W.IngLend||!$fab())return Promise.resolve();var now=Date.now();if(!force&&now-LAST<60000)return Promise.resolve();LAST=now;BUSY=true;
  var found=[],chain=Promise.resolve();
  comps().forEach(function(c){chain=chain.then(function(){return IngLend.request(c.id,"GET","/ingenium/apps/outbox",null,8).then(function(x){(x&&x.apps||[]).forEach(function(a){if(!SKIP[a.id]&&!KEPT[a.id])found.push({app:a,comp:c});});},function(){});});});
  return chain.then(function(){BUSY=false;WAIT=found;place();},function(){BUSY=false;});}
function $fab(){return D.getElementById("page-fabrica");}
function place(){var old=D.getElementById("r316In");var list=D.getElementById("fbRepos");
  if(!WAIT.length||!list){if(old)old.remove();return;}
  if(old&&old.nextSibling===list&&old.getAttribute("data-n")===String(WAIT.length))return;if(old)old.remove();
  var b=mk("div","r316-in");b.id="r316In";b.setAttribute("data-n",String(WAIT.length));
  WAIT.forEach(function(w){var row=mk("div","r316-inrow");row.appendChild(mk("span","ic",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICON.inside+"</svg>"));
    row.appendChild(mk("span","tx","<b>"+esc(w.app.name)+(w.app.version?" "+esc(w.app.version):"")+"</b><span>From "+esc(w.comp.name||w.app.computer||"your computer")+", for this device</span>"));
    var k=mk("span","r316-keys");k.appendChild(key("c-lav sm","Keep it here",function(){keep(w);}));k.appendChild(key("quiet sm","Not now",function(){SKIP[w.app.id]=1;WAIT=WAIT.filter(function(x){return x!==w;});place();}));row.appendChild(k);b.appendChild(row);});
  list.parentNode.insertBefore(b,list);}
function keep(w){var h=H(),a=w.app,c=w.comp;if(KEPT[a.id])return;KEPT[a.id]=1;WAIT=WAIT.filter(function(x){return x.app.id!==a.id;});place();if(h)h.busy("Keeping "+a.name+" here…");
  IngLend.request(c.id,"GET","/ingenium/apps/get?id="+encodeURIComponent(a.id),null,60).then(function(x){var html=new TextDecoder().decode(unb64(x.b64)),msg="From "+(c.name||"your computer")+(a.version?": "+a.version:"");
    return IngRepo.list().then(function(rs){var same=(rs||[]).filter(function(r){return String(r.name||"").trim().toLowerCase()===String(a.name||"").trim().toLowerCase();})[0];
      if(!same)return IngRepo.fromFiles([{path:"index.html",data:html}],{name:a.name,msg:msg}).then(function(r){return r.id;});
      return IngRepo.files(same.id).then(function(list){var pg=(list.filter(function(f){return /\.html?$/i.test(f.path)&&f.path.indexOf("/")<0;})[0]||{}).path||"index.html";
        return IngRepo.putMany(same.id,[{path:pg,data:html}]).then(function(){return IngRepo.commit(same.id,msg);}).catch(function(e){if(!/nothing has changed/i.test(String(e&&e.message||e)))throw e;}).then(function(){return same.id;});});});})
    .then(function(id){return IngLend.request(c.id,"POST","/ingenium/apps/got",{id:a.id},20).catch(function(){}).then(function(){return id;});}).then(function(id){
      WAIT=WAIT.filter(function(x){return x!==w;});place();if(h){h.unbusy();try{h.FBS().sel=id;h.saveSoon();}catch(e){}h.refresh().then(function(){h.paint();place();});}
      toast(a.name+" is in Your apps. Run it opens it.");},function(e){delete KEPT[a.id];if(h)h.unbusy();fail(e);LAST=0;check(true);});}
/* asked when Fabrica opens, when the device wakes, and once a minute while Fabrica is on show */
(function wire(){var n=0;(function wait(){if(W.__ingReady===true){
    try{var og=W.go;if(typeof og==="function"&&!og.__r316){var g=function(p){var r=og.apply(this,arguments);try{if(p==="fabrica")setTimeout(function(){check(true);},600);}catch(e){}return r;};
      Object.keys(og).forEach(function(k){g[k]=og[k];});g.__r316=1;W.go=g;try{go=g;}catch(e){}}}catch(e){}
    D.addEventListener("visibilitychange",function(){if(!D.hidden)check(false);});
    setInterval(function(){var f=$fab();if(f&&f.classList.contains("active"))check(false);},60000);
    try{var fb=null;new MutationObserver(function(){if(WAIT.length&&!D.getElementById("r316In"))place();}).observe(D.body,{childList:true,subtree:true});}catch(e){}
    setTimeout(function(){check(true);},4000);return;}if(++n<400)setTimeout(wait,500);})();})();

W.IngIphone={open:open,pages:pages,webFiles:webFiles,check:check,qrSvg:qrSvg,slugOf:slugOf};
})();
;try{window.__ingParts["p316"]="running";}catch(_){}
</script>
