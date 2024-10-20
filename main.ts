function radioSay (text5: string, val: number) {
    radio.sendValue("" + btToken + text5, val)
    notLegos.printLine("said: " + text5 + "=" + val, 7)
}
function buttonPress (button: string) {
    notLegos.printLine("button: " + button, 6)
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
function ready_oled () {
    if (isCastleSay) {
        notLegos.printLine("W" + Math.constrain(lastWater, 0, 99) + " Fog: " + fogToggle, 1)
        notLegos.printLine("D" + lastSonarRead + " H" + Math.round(lastHue / 1) + " G" + lastGesture + " N" + lastHunt, 2)
        notLegos.printLine("" + "" + " V" + lastVolumeRead, 3)
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
            } else if (theName == "welco") {
                if (value == 1) {
                    notLegos.vfxReset(notLegos.vfxEffect.glow)
                    notLegos.setEffect(notLegos.vfxRegion.CastleSayAll, notLegos.vfxEffect.glow)
                    notLegos.mp3voicePlay(notLegos.voiceSaying.welcome)
                } else if (value == 2) {
                    notLegos.setEffect(notLegos.vfxRegion.CastleSayAll, notLegos.vfxEffect.off)
                    notLegos.setEffect(notLegos.vfxRegion.WheelAll, notLegos.vfxEffect.fire)
                    basic.pause(1200)
                    notLegos.mp3voicePlay(notLegos.voiceSaying.intro)
                    basic.pause(3000)
                    notLegos.setEffect(notLegos.vfxRegion.CastleSayAll, notLegos.vfxEffect.off)
                    basic.pause(4000)
                    notLegos.mp3musicPlay(notLegos.musicGenre.awaiting)
                    castleMode = "wait_reg"
                }
            } else if (theName == "check") {
                notLegos.setEffect(notLegos.vfxRegion.CastleSayAll, notLegos.vfxEffect.off)
                radioSay("ready", 1)
            } else if (false) {
            	
            }
        } else {
            if (theName == "ready") {
                castleMode = "go"
                notLegos.printLine("Status:" + "go!", 6)
                notLegos.setEffect(notLegos.vfxRegion.KongFront, notLegos.vfxEffect.indicate)
            } else if (theName == "boot") {
                fogLevel = 3
                notLegos.setEffect(notLegos.vfxRegion.CastleDoAll, notLegos.vfxEffect.parade)
                notLegos.motorSet(notLegos.motors.wheel, notLegos.motorState.max)
                basic.pause(value * 1000)
                notLegos.motorSet(notLegos.motors.wheel, notLegos.motorState.min)
                basic.pause(1000)
                radioSay("welco", 1)
                basic.pause(200)
                notLegos.vfxReset(notLegos.vfxEffect.glow)
                notLegos.setEffect(notLegos.vfxRegion.CastleDoAll, notLegos.vfxEffect.glow)
                basic.pause(5000)
                notLegos.setEffect(notLegos.vfxRegion.CastleDoAll, notLegos.vfxEffect.idle)
                notLegos.setEffect(notLegos.vfxRegion.SpotH, notLegos.vfxEffect.mine)
                notLegos.setEffect(notLegos.vfxRegion.SpotI, notLegos.vfxEffect.mine)
                basic.pause(0)
                radioSay("welco", 2)
                basic.pause(4500)
                notLegos.setEffect(notLegos.vfxRegion.CastleDoAll, notLegos.vfxEffect.off)
                basic.pause(500)
                notLegos.setEffect(notLegos.vfxRegion.BrickDragon, notLegos.vfxEffect.indicate)
                basic.pause(1200)
                notLegos.setEffect(notLegos.vfxRegion.SpotC, notLegos.vfxEffect.indicate)
                notLegos.setEffect(notLegos.vfxRegion.SpotE, notLegos.vfxEffect.indicate)
                basic.pause(3000)
                fogLevel = 1
                notLegos.motorSet(notLegos.motors.door, notLegos.motorState.max)
            } else if (theName == "tutor") {
                if (value == 1) {
                    notLegos.setEffect(notLegos.vfxRegion.CastleDoAll, notLegos.vfxEffect.off)
                    basic.pause(4000)
                    notLegos.vfxReset(notLegos.vfxEffect.glow)
                    notLegos.setEffect(notLegos.vfxRegion.SpotA, notLegos.vfxEffect.glow)
                    basic.pause(6000)
                    notLegos.setEffect(notLegos.vfxRegion.SpotB, notLegos.vfxEffect.indicate)
                    notLegos.setEffect(notLegos.vfxRegion.SpotC, notLegos.vfxEffect.indicate)
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
        notLegos.mp3sfxPlay(notLegos.sfxType.fire)
        notLegos.mp3musicPlay(notLegos.musicGenre.intro)
    }
})
function fogFlood () {
    if (fogToggle) {
        fogLevel = 3
        basic.pause(10000)
        notLegos.setEffect(notLegos.vfxRegion.CastleDoAll, notLegos.vfxEffect.parade)
        radioSay("para", 1)
        fogLevel = 0
        notLegos.motorSet(notLegos.motors.fan, notLegos.motorState.max)
        notLegos.motorSet(notLegos.motors.door, notLegos.motorState.max)
        basic.pause(1000)
        notLegos.motorSet(notLegos.motors.fan, notLegos.motorState.mid)
        basic.pause(6000)
        notLegos.motorSet(notLegos.motors.fan, notLegos.motorState.min)
        basic.pause(500)
        notLegos.motorSet(notLegos.motors.fan, notLegos.motorState.off)
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
let iTook = 0
let theName = ""
let lastWater = 0
let castleMode = ""
let digits: notLegos.TM1637LEDs = null
let isCastleSay = false
let btToken = ""
let fogLevel = 0
let fogToggle = false
let lastHunt = 0
let lastLaserC = 0
let lastLaserL = 0
let lastLaserR = 0
let lastHue = 0
let lastGesture = 0
let lastSonarRead = 0
let lastVolumeRead = 0
let buttonRow = 0
lastVolumeRead = 0
lastSonarRead = 0
lastGesture = 0
lastHue = 0
lastLaserR = 0
lastLaserL = 0
lastLaserC = 0
lastHunt = 0
fogToggle = false
fogLevel = 0
btToken = "KC$"
pins.setAudioPinEnabled(false)
led.enable(false)
isCastleSay = notLegos.SonarFirstRead(DigitalPin.P8, DigitalPin.P9) > 0
radio.setGroup(171)
notLegos.oledinit()
if (isCastleSay) {
    notLegos.potSet(AnalogPin.P10)
    digits = notLegos.tm1637Create(DigitalPin.P7, DigitalPin.P6)
    digits.showNumber(3000)
    pins.digitalWritePin(DigitalPin.P5, 1)
    pins.digitalWritePin(DigitalPin.P1, 1)
    notLegos.mp3setPorts(notLegos.mp3type.music, SerialPin.P14)
    notLegos.mp3setPorts(notLegos.mp3type.sfxvoice, SerialPin.P15)
    notLegos.mp3setPorts(notLegos.mp3type.player, SerialPin.P16)
    pins.digitalWritePin(DigitalPin.P11, 0)
    pins.digitalWritePin(DigitalPin.P12, 1)
    pins.digitalWritePin(DigitalPin.P13, 1)
    basic.pause(20)
    notLegos.setVolume(notLegos.mp3type.sfxvoice, 100)
    notLegos.setVolume(notLegos.mp3type.player, 100)
    notLegos.setVolume(notLegos.mp3type.music, 100)
    digits.showNumber(0)
} else {
    notLegos.motorSet(notLegos.motors.fan, notLegos.motorState.off)
    notLegos.motorSet(notLegos.motors.redrack, notLegos.motorState.min)
    notLegos.motorSet(notLegos.motors.shark, notLegos.motorState.min)
    notLegos.motorSet(notLegos.motors.ghost, notLegos.motorState.min)
    notLegos.motorSet(notLegos.motors.cannon, notLegos.motorState.min)
    notLegos.motorSet(notLegos.motors.oarrack, notLegos.motorState.min)
    notLegos.motorSet(notLegos.motors.shell, notLegos.motorState.min)
    notLegos.motorSet(notLegos.motors.door, notLegos.motorState.min)
    notLegos.motorSet(notLegos.motors.dragon, notLegos.motorState.min)
    notLegos.motorSet(notLegos.motors.wheel, notLegos.motorState.off)
    notLegos.castleLights()
    notLegos.setEffect(notLegos.vfxRegion.CastleDoAll, notLegos.vfxEffect.parade)
}
let iBegan = input.runningTimeMicros()
let isReady = true
castleMode = "init"
loops.everyInterval(500, function () {
	
})
loops.everyInterval(500, function () {
    if (isCastleSay) {
        notLegos.printLine("//Castle Say//" + iTook, 0)
        notLegos.updateVolumeGlobal()
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
        lastVolumeRead = pins.analogReadPin(AnalogReadWritePin.P10)
        lastWater = Math.round(pins.analogReadPin(AnalogReadWritePin.P2) / 30 - 0)
        fogToggle = pins.analogReadPin(AnalogReadWritePin.P0) < 1000
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
