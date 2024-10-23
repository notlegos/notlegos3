function radioSay (text5: string, val: number) {
    radio.sendValue("" + btToken + text5, val)
    notLegos.printLine("said: " + text5 + "=" + val, 7)
}
function sayLights (light2: number, effect: number) {
    radioSay("L" + light2, effect)
}
function buttonPress (button: string) {
    notLegos.printLine("button: " + button, 6)
}
function setRadio (key: string, channel: number) {
    btToken = "" + key.substr(0, 2) + "$"
    radio.setGroup(171)
}
function runTutorial () {
    radioSay("tutor", 1)
    notLegos.setVolume(notLegos.mp3type.music, 80)
    basic.pause(20)
    notLegos.mp3musicPlay(notLegos.musicGenre.tutorial)
    fogLevel = 3
    notLegos.mp3voicePlay(notLegos.voiceSaying.howto1)
    basic.pause(5950)
    notLegos.mp3voicePlay(notLegos.voiceSaying.howto2)
    basic.pause(5000)
    notLegos.mp3voicePlay(notLegos.voiceSaying.howto3)
    basic.pause(7600)
    notLegos.mp3voicePlay(notLegos.voiceSaying.howto4)
    basic.pause(6100)
    notLegos.mp3voicePlay(notLegos.voiceSaying.howto5)
    basic.pause(13000)
    notLegos.mp3voicePlay(notLegos.voiceSaying.howto6)
    notLegos.setVolume(notLegos.mp3type.music, 100)
    basic.pause(7000)
    notLegos.mp3musicPlay(notLegos.musicGenre.awaiting)
}
function sayReset () {
    radioSay("RESET", 1)
}
function sayMode (left: boolean, center: boolean, right: boolean) {
    if (left) {
        laserMode = "l"
    } else {
        laserMode = ""
    }
    if (center) {
        laserMode = "" + laserMode + "c"
    }
    if (right) {
        laserMode = "" + laserMode + "r"
    }
    radioSay("D" + laserMode, 1)
}
function ready_oled () {
    if (isCastleSay) {
        notLegos.printLine("W" + Math.constrain(lastWater, 0, 99) + " Fog: " + fogToggle, 1)
        notLegos.printLine("D" + lastSonarRead + " H" + Math.round(lastHue / 1) + " G" + lastGesture + " N" + lastHunt, 2)
        notLegos.printLine(" V" + notLegos.mp3durationMusic(), 3)
        notLegos.printLine("Mode: " + castleMode, 4)
        notLegos.printLine("M:" + notLegos.mp3durationMusic(), 5)
    } else {
        notLegos.printLine("M: " + castleMode + "" + "", 1)
        notLegos.printLine("R" + Math.constrain(lastLaserR, 0, 9) + " C" + Math.constrain(lastLaserC, 0, 9) + " L" + Math.constrain(lastLaserL, 0, 9), 2)
    }
}
radio.onReceivedValue(function (name, value) {
    if (name.substr(0, btToken.length) == btToken) {
        theName = name.substr(btToken.length, name.length - btToken.length)
        if (isCastleSay) {
            if (theName == "ready") {
                radioSay("ready", 1)
                pins.digitalWritePin(DigitalPin.P5, 1)
                notLegos.mp3musicPlay(notLegos.musicGenre.intro)
                fogLow = true
                fogHigh = true
                fogBlow = true
                basic.pause(notLegos.mp3durationMusic() * 1000)
                radioSay("ready", 2)
                basic.pause(3500)
                notLegos.mp3musicPlay(notLegos.musicGenre.awaiting)
                basic.pause(1500)
                notLegos.setVolume(notLegos.mp3type.music, 75)
                notLegos.mp3voicePlay(notLegos.voiceSaying.welcome)
                basic.pause(notLegos.mp3durationSfxVoice() * 1000)
                fogHigh = false
                fogBlow = false
                basic.pause(2500)
                radioSay("ready", 3)
                notLegos.mp3voicePlay(notLegos.voiceSaying.intro)
                basic.pause(7500)
                notLegos.setVolume(notLegos.mp3type.music, 100)
            } else if (theName == "welco") {
            	
            } else if (theName == "check") {
                notLegos.setEffect(notLegos.vfxRegion.Score1, notLegos.vfxEffect.off)
                radioSay("ready", 1)
            } else if (false) {
            	
            }
        } else {
            if (theName == "ready") {
                if (value == 1) {
                    castleMode = "go"
                    notLegos.printLine("Status:" + "go!", 6)
                    notLegos.setEffect(notLegos.vfxRegion.CastleAll, notLegos.vfxEffect.glow)
                } else if (value == 2) {
                    notLegos.setEffect(notLegos.vfxRegion.CastleAll, notLegos.vfxEffect.parade)
                    basic.pause(500)
                    notLegos.motorSet(notLegos.motors.swing, notLegos.motorState.mid)
                    basic.pause(1000)
                    notLegos.motorSet(notLegos.motors.wheel, notLegos.motorState.max)
                    basic.pause(2000)
                    notLegos.motorSet(notLegos.motors.swing, notLegos.motorState.off)
                    notLegos.motorSet(notLegos.motors.wheel, notLegos.motorState.off)
                    basic.pause(2500)
                    notLegos.setEffect(notLegos.vfxRegion.SpotH, notLegos.vfxEffect.active)
                    notLegos.setEffect(notLegos.vfxRegion.SpotI, notLegos.vfxEffect.active)
                } else if (value == 3) {
                    basic.pause(3000)
                    notLegos.setEffect(notLegos.vfxRegion.CastleAll, notLegos.vfxEffect.off)
                    notLegos.setEffect(notLegos.vfxRegion.BrickDragon, notLegos.vfxEffect.indicateL)
                    basic.pause(2000)
                    notLegos.setEffect(notLegos.vfxRegion.SpotE, notLegos.vfxEffect.indicateR)
                    basic.pause(3500)
                    notLegos.motorSet(notLegos.motors.door, notLegos.motorState.mid)
                    basic.pause(4000)
                } else if (value == 4) {
                	
                } else {
                	
                }
            } else if (theName == "boot") {
            	
            } else if (theName == "tutor") {
                if (value == 1) {
                	
                } else if (value == 2) {
                	
                }
            } else if (theName == "welco") {
            	
            } else {
            	
            }
        }
        notLegos.printLine("heard: " + theName + "=" + value, 6)
    }
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (isCastleSay) {
        notLegos.mp3sayPlay(notLegos.playerSaying.ready)
        notLegos.mp3magician(notLegos.magicianSaysSide.right, notLegos.magicianDifficulty.hard)
        notLegos.mp3magicianAgain()
        notLegos.mp3sfxPlay(notLegos.sfxType.fire)
        notLegos.mp3musicPlay(notLegos.musicGenre.intro)
    }
})
function fogFlood () {
    if (fogToggle) {
        fogLevel = 3
        basic.pause(10000)
        notLegos.setEffect(notLegos.vfxRegion.Score1, notLegos.vfxEffect.parade)
        radioSay("para", 1)
        fogLevel = 0
        notLegos.motorSet(notLegos.motors.redrack, notLegos.motorState.max)
        notLegos.motorSet(notLegos.motors.door, notLegos.motorState.max)
        basic.pause(1000)
        notLegos.motorSet(notLegos.motors.redrack, notLegos.motorState.mid)
        basic.pause(6000)
        notLegos.motorSet(notLegos.motors.redrack, notLegos.motorState.min)
        basic.pause(500)
        notLegos.motorSet(notLegos.motors.redrack, notLegos.motorState.off)
        notLegos.motorSet(notLegos.motors.door, notLegos.motorState.min)
        fogLevel = 1
        notLegos.setSock(notLegos.sockState.dancing)
        basic.pause(6000)
        notLegos.setSock(notLegos.sockState.still)
        basic.pause(2000)
        notLegos.motorSet(notLegos.motors.wheel, notLegos.motorState.max)
        basic.pause(8000)
        notLegos.motorSet(notLegos.motors.wheel, notLegos.motorState.min)
        basic.pause(2000)
        notLegos.motorSet(notLegos.motors.redrack, notLegos.motorState.max)
        basic.pause(2000)
        notLegos.motorSet(notLegos.motors.redrack, notLegos.motorState.min)
        basic.pause(2000)
        notLegos.motorSet(notLegos.motors.shark, notLegos.motorState.max)
        basic.pause(2000)
        notLegos.motorSet(notLegos.motors.shark, notLegos.motorState.min)
        basic.pause(2000)
        notLegos.motorSet(notLegos.motors.ghost, notLegos.motorState.max)
        basic.pause(2000)
        notLegos.motorSet(notLegos.motors.ghost, notLegos.motorState.min)
        basic.pause(2000)
        notLegos.motorSet(notLegos.motors.cannon, notLegos.motorState.max)
        basic.pause(2000)
        notLegos.motorSet(notLegos.motors.cannon, notLegos.motorState.min)
        basic.pause(2000)
        notLegos.motorSet(notLegos.motors.oarrack, notLegos.motorState.max)
        basic.pause(2000)
        notLegos.motorSet(notLegos.motors.oarrack, notLegos.motorState.min)
        basic.pause(2000)
        notLegos.motorSet(notLegos.motors.shell, notLegos.motorState.max)
        basic.pause(2000)
        notLegos.motorSet(notLegos.motors.shell, notLegos.motorState.min)
        basic.pause(2000)
        notLegos.motorSet(notLegos.motors.dragon, notLegos.motorState.max)
        basic.pause(2000)
        notLegos.motorSet(notLegos.motors.dragon, notLegos.motorState.min)
    }
}
function sayMotor (motor: number, setting: number) {
    radioSay("M" + motor, setting)
}
let buttonRow = 0
let iTook = 0
let theName = ""
let lastWater = 0
let laserMode = ""
let btToken = ""
let castleMode = ""
let digits: notLegos.TM1637LEDs = null
let isCastleSay = false
let fogLevel = 0
let fogBlow = false
let fogHigh = false
let fogLow = false
let fogToggle = false
let lastHunt = 0
let lastLaserC = 0
let lastLaserL = 0
let lastLaserR = 0
let lastHue = 0
let lastGesture = 0
let lastSonarRead = 0
let lastVolumeRead = 0
lastSonarRead = 0
lastGesture = 0
lastHue = 0
lastLaserR = 0
lastLaserL = 0
lastLaserC = 0
lastHunt = 0
fogToggle = false
fogLow = false
fogHigh = false
fogBlow = false
fogLevel = 0
pins.setAudioPinEnabled(false)
led.enable(false)
setRadio("KC", 171)
isCastleSay = notLegos.SonarFirstRead(DigitalPin.P8, DigitalPin.P9) > 0
notLegos.oledinit()
if (isCastleSay) {
    notLegos.potSet(AnalogPin.P10)
    digits = notLegos.tm1637Create(DigitalPin.P7, DigitalPin.P6)
    pins.digitalWritePin(DigitalPin.P5, 0)
    pins.digitalWritePin(DigitalPin.P1, 1)
    notLegos.mp3setPorts(notLegos.mp3type.music, SerialPin.P14)
    notLegos.mp3setPorts(notLegos.mp3type.sfxvoice, SerialPin.P15)
    notLegos.mp3setPorts(notLegos.mp3type.player, SerialPin.P16)
    basic.pause(20)
    notLegos.setVolume(notLegos.mp3type.sfxvoice, 100)
    notLegos.setVolume(notLegos.mp3type.player, 100)
    notLegos.setVolume(notLegos.mp3type.music, 100)
    digits.showPrettyNumber(-30)
} else {
    notLegos.motorSet(notLegos.motors.redrack, notLegos.motorState.off)
    notLegos.motorSet(notLegos.motors.swing, notLegos.motorState.off)
    notLegos.motorSet(notLegos.motors.shark, notLegos.motorState.min)
    notLegos.motorSet(notLegos.motors.ghost, notLegos.motorState.min)
    notLegos.motorSet(notLegos.motors.cannon, notLegos.motorState.min)
    notLegos.motorSet(notLegos.motors.oarrack, notLegos.motorState.min)
    notLegos.motorSet(notLegos.motors.shell, notLegos.motorState.min)
    notLegos.motorSet(notLegos.motors.door, notLegos.motorState.min)
    notLegos.motorSet(notLegos.motors.dragon, notLegos.motorState.min)
    notLegos.motorSet(notLegos.motors.wheel, notLegos.motorState.off)
    notLegos.castleLights()
    notLegos.setEffect(notLegos.vfxRegion.CastleAll, notLegos.vfxEffect.off)
}
let iBegan = input.runningTimeMicros()
let isReady = true
castleMode = "init"
loops.everyInterval(500, function () {
    if (isCastleSay) {
        lastWater = Math.round(pins.analogReadPin(AnalogReadWritePin.P2) / 30 - 0)
        lastVolumeRead = pins.analogReadPin(AnalogReadWritePin.P10)
        fogToggle = pins.analogReadPin(AnalogReadWritePin.P0) < 1000
        notLegos.printLine("//Castle Say//" + iTook, 0)
        notLegos.updateVolumeGlobal()
        if (fogToggle) {
            if (fogLow) {
                pins.digitalWritePin(DigitalPin.P11, 0)
            } else {
                pins.digitalWritePin(DigitalPin.P11, 1)
            }
            if (fogHigh) {
                pins.digitalWritePin(DigitalPin.P12, 0)
            } else {
                pins.digitalWritePin(DigitalPin.P12, 1)
            }
        } else {
            pins.digitalWritePin(DigitalPin.P11, 1)
            pins.digitalWritePin(DigitalPin.P12, 1)
        }
        if (fogBlow) {
            pins.digitalWritePin(DigitalPin.P13, 0)
        } else {
            pins.digitalWritePin(DigitalPin.P13, 1)
        }
    } else {
        notLegos.printLine("//Castle Do// " + iTook, 0)
    }
})
loops.everyInterval(40, function () {
    iBegan = input.runningTime()
    if (isCastleSay) {
        buttonRow = pins.analogReadPin(AnalogReadWritePin.P4)
        if (buttonRow < 10) {
            buttonPress("a")
        } else if (buttonRow < 60) {
            buttonPress("b")
        } else if (buttonRow < 110) {
            buttonPress("c")
        } else if (buttonRow < 200) {
            buttonPress("d")
        } else if (buttonRow < 700) {
            buttonPress("e")
        }
        lastHunt = pins.digitalReadPin(DigitalPin.P3)
        lastSonarRead = notLegos.SonarNextRead()
        lastHue = Connected.readColor()
        lastGesture = Connected.getGesture()
    } else {
        if (castleMode == "init") {
            radioSay("ready", 1)
        }
        notLegos.castleSayTick()
        lastLaserC = pins.analogReadPin(AnalogReadWritePin.P2)
        lastLaserL = pins.analogReadPin(AnalogReadWritePin.P0)
        lastLaserR = pins.analogReadPin(AnalogReadWritePin.P1)
    }
    ready_oled()
    notLegos.changeThree()
    iTook = input.runningTime() - iBegan
})
