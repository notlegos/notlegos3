function radioSay (text5: string, val: number) {
    radio.sendValue("" + btToken + text5, val)
    notLegos.printLine("said: " + text5 + "=" + val, 7)
}
function buttonPress (button: string) {
    notLegos.printLine("button: " + button, 3)
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
        let lastHunt = 0
        let lastGesture = 0
        let lastHue = 0
        let lastSonarRead = 0
        let lastLaserL = 0
        let lastLaserC = 0
        let lastLaserR = 0
        notLegos.printLine("// Castle Say //", 0)
        notLegos.printLine("R" + Math.constrain(lastLaserR, 0, 9) + " C" + Math.constrain(lastLaserC, 0, 9) + " L" + Math.constrain(lastLaserL, 0, 9), 1)
        notLegos.printLine("S" + lastSonarRead + " H" + Math.round(lastHue / 3) + " G" + lastGesture + " N" + lastHunt, 2)
        notLegos.printLine("Mode: " + castleMode, 3)
        notLegos.printLine("M:" + notLegos.mp3durationMusic(), 4)
    } else {
        notLegos.printLine("// Castle Do //", 0)
        notLegos.printLine("M: " + castleMode + " T " + fogToggle, 1)
    }
}
radio.onReceivedValue(function (name, value) {
    if (name.substr(0, btToken.length) == btToken) {
        theName = name.substr(btToken.length, name.length - btToken.length)
        if (isCastleSay) {
            if (theName == "wstar") {
                castleMode = "wait_start"
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
                radioSay("wstar", 1)
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
let fogToggle = 0
let castleMode = ""
let isCastleSay = 0
let fogLevel = 0
let btToken = ""
notLegos.oledinit()
notLegos.castleSayLights(DigitalPin.P3, DigitalPin.P0, DigitalPin.P16)
let iBegan = input.runningTimeMicros()
loops.everyInterval(500, function () {
	
})
loops.everyInterval(500, function () {
	
})
loops.everyInterval(2000, function () {
    notLegos.printLine("" + iTook + "", 5)
})
loops.everyInterval(40, function () {
    let isReady = 0
    iBegan = input.runningTime()
    notLegos.castleSayTick()
    if (isReady) {
    	
    }
    ready_oled()
    notLegos.changeThree()
    iTook = input.runningTime() - iBegan
})
