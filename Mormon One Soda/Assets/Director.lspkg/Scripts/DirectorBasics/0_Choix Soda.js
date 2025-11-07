//@input SceneObject parent
//@input SceneObject[] Buttons
//@input SceneObject[] Hints
//@input Component.AudioComponent[] Sound
//input Component.Image ImitateElio
//@input Asset.Texture[] VideoSodas
//@input Asset.Texture[] VideoLiq
//input Component.VFXComponent Parti

//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"/// OUTLINES ///"}
//@ui {"widget":"separator"}

//_________________________Director Setup_________________________//
script.subScene = new global.SubScene(script, script.parent);
script.subScene.OnStart = Start;
script.subScene.OnLateStart = OnLateStart;
script.subScene.OnStop = Stop;
script.subScene.SetUpdate(Update);
//__________________________Variables_____________________________//
//________Caller________//
const SodaPressCaller = script.subScene.CreateCaller("SodaPress");
//exemple : outroCaller.Call()
//________Listener________//
const SodaPressListener = script.subScene.CreateListener("SodaPress", SodaPress);
const TapTutoListener = script.subScene.CreateListener("TapTuto", TapTuto);
const RetryListener = script.subScene.CreateListener("Retry", Retry);


//________DelayEvent________//
var delayedEndVideoColaEvent = script.subScene.CreateEvent("DelayedCallbackEvent", delayedEndVideoCola);
var delayedEndVideoSwEvent = script.subScene.CreateEvent("DelayedCallbackEvent", delayedEndVideoSw);
var delayedEndVideoBeerEvent = script.subScene.CreateEvent("DelayedCallbackEvent", delayedEndVideoBeer);

var delayedStartVideoColaEvent = script.subScene.CreateEvent("DelayedCallbackEvent", delayedStartVideoCola);
var delayedStartVideoSwEvent = script.subScene.CreateEvent("DelayedCallbackEvent", delayedStartVideoSw);
var delayedStartVideoBeerEvent = script.subScene.CreateEvent("DelayedCallbackEvent", delayedStartVideoBeer);

//global.currentCyclePhoto=0;

//exemple : script.WellDone.play(1);
//var randomInt = Math.floor(Math.random() * 4);//0-3
var idToGoTo=0
let controlColaVideo = script.VideoSodas[0].control
let controlSwVideo = script.VideoSodas[1].control
let controlBeerVideo = script.VideoSodas[2].control

let controlLiqColaVideo = script.VideoLiq[0].control
let controlLiqSwVideo = script.VideoLiq[1].control
let controlLiqBeerVideo = script.VideoLiq[2].control

global.GobChoose=0;

//_________________________Director functions_____________________//
function Start() {}
function OnLateStart() {
    script.Sound[0].play(-1)
    script.Sound[1].play(1)
    //FadeHintTapanim.Start()
    


    //CloseButtonImage=script.ButtonClose.getComponent("Component.Image");
    //CloseButtonInteraction=script.ButtonClose.getComponent("Component.InteractionComponent");

}
function Update() {}
function Stop() {
    FadeHintTapanim.Reset()
    script.Buttons[0].getComponent("Component.InteractionComponent").enabled = true;
    script.Buttons[1].getComponent("Component.InteractionComponent").enabled = true;
    script.Buttons[2].getComponent("Component.InteractionComponent").enabled = true;
}
//___________________________Functions__________________________//

/*


global.ResumeVideo(controlTwix)




*/
//script.Parti.asset.properties["KillParti"] = 1

//________Button________//
var delaystopSoda=2.6
script.Buttons[0].getComponent("Component.InteractionComponent").onTap.add(function() {
    SodaPressCaller.Call(0)
    delayedStartVideoColaEvent.event.reset(0.6)
    global.PlayVideo(controlLiqColaVideo, 1)
    delayedEndVideoColaEvent.event.reset(delaystopSoda)
});

script.Buttons[1].getComponent("Component.InteractionComponent").onTap.add(function() {
    SodaPressCaller.Call(1)
    delayedStartVideoSwEvent.event.reset(0.6)
    global.PlayVideo(controlLiqSwVideo, 1)

    delayedEndVideoSwEvent.event.reset(delaystopSoda)
});

script.Buttons[2].getComponent("Component.InteractionComponent").onTap.add(function() {
    SodaPressCaller.Call(2)
    delayedStartVideoBeerEvent.event.reset(0.6)
    global.PlayVideo(controlLiqBeerVideo, 1)

    delayedEndVideoBeerEvent.event.reset(delaystopSoda)

});
//________FunctionsPerso________//
function Retry()
{
    script.Buttons[0].getComponent("Component.InteractionComponent").enabled = true;
    script.Buttons[1].getComponent("Component.InteractionComponent").enabled = true;
    script.Buttons[2].getComponent("Component.InteractionComponent").enabled = true;
    switch (global.GobChoose){
        case 0:
        global.ResumeVideo(controlColaVideo)
        break;
        
        case 1:
        global.ResumeVideo(controlSwVideo)
        break;
        
        case 2:
        global.ResumeVideo(controlBeerVideo)
        break;
    }
/*
    global.ResumeVideo(controlColaVideo, 1)
    global.ResumeVideo(controlSwVideo, 1)
    global.ResumeVideo(controlBeerVideo, 1)

    global.ResumeVideo(controlLiqColaVideo, 1)
    global.ResumeVideo(controlLiqSwVideo, 1)
    global.ResumeVideo(controlLiqBeerVideo, 1)*/

}
function TapTuto()
{
    FadeHintTapanim.Start()
}
function SodaPress(id)
{
    script.Sound[2].play(1)

    global.GobChoose=id
    DesactivationButtonSoda()   
    idToGoTo=id
    FadeHintTapanim.GoTo(0)
    ScaleButtonAnim.Reset()
    ScaleButtonAnim.Start(1)
}

function delayedStartVideoCola()
{
    global.PlayVideo(controlColaVideo, 1)
}

function delayedStartVideoSw()
{
    global.PlayVideo(controlSwVideo, 1)
}

function delayedStartVideoBeer()
{
    global.PlayVideo(controlBeerVideo, 1)
}

function delayedEndVideoCola()
{
    global.PauseVideo(controlColaVideo)
    if(controlColaVideo.status != VideoStatus.Preparing)
    {
        print("AHHHH")
    }
}

function delayedEndVideoSw()
{
    global.PauseVideo(controlSwVideo)
    if(controlSwVideo.status != VideoStatus.Preparing)
    {
        print("AHHHH")
    }
}

function delayedEndVideoBeer()
{
    global.PauseVideo(controlBeerVideo)
    if(controlBeerVideo.status != VideoStatus.Preparing)
    {
        print("AHHHH")
    }
}

function DesactivationButtonSoda()
{
    script.Buttons[0].getComponent("Component.InteractionComponent").enabled = false;
    script.Buttons[1].getComponent("Component.InteractionComponent").enabled = false;
    script.Buttons[2].getComponent("Component.InteractionComponent").enabled = false;
}
/*
function PlayVideoFlash()
{
    var test = script.Flashvideo.control;
    test.play(1);
    script.FlashSound.play(1);
    
    print("Video flash play");
}
//@input Asset.Texture SequenceRevealSeb
function Seb2DSequence() {
    script.CrabSound.play(1);
    animFadeSeb.JumpTo(1);
    var Seb = script.SequenceRevealSeb.control;
    Seb.play(1, 0.0);
    //Seb.pauseAtFrame(30);
    //print("Test")
}

*/

/*
var TodayScript=new Date();
//var TodayScript=new Date(2025, 6, 2, 1); //8 juin

function UpdateCountdown()
{
    var offsetHours=-(TodayScript.getTimezoneOffset()/60)
    var HourRightGMT=offsetHours+7+script.HourGMTLA
    if(HourRightGMT>24)
    {
        HourRightGMT-=24;
    }
    countdownmonth=GoalDate.getMonth()-TodayScript.getMonth()
    countdownday=GoalDate.getDate()-TodayScript.getDate()
    var countdownfinal=countdownday+30*countdownmonth
    script.cdmTxt[1].text="J - "+countdownfinal
}*/
//script.ImageUp1.mainPass.baseTex=script.TextureElioGordonUp1;
//FadeBackgroundWithoutSeganim.GoTo(0);
/*
// input float speed = 1.0 {"widget":"slider", "min":0, "max":10, "step":0.01}
// input float amplitude = 10.0 {"widget":"slider", "min":0, "max":50, "step":0.01}
// input vec3[] basePosition = {0,0,0}
//print(script.Pasteque3DUI[5].getTransform().getLocalPosition())
//________Rotate________//
function rotateConstant1() {
    var transform = script.Pasteque3DRotate[0].getTransform();
    var rotation = transform.getLocalRotation();
    // Convertir la vitesse en radians/frame
    var angleDelta = (script.speedRotation * Math.PI / 180) * getDeltaTime();
    var rotateBy = quat.angleAxis(angleDelta, vec3.one());
    rotation = rotation.multiply(rotateBy);
    transform.setLocalRotation(rotation);
}
//________Float________//
    function floatY() {
    var randomSync = Math.floor(Math.random() * 4);//0-3
    randomSync=0.4
    var t = getTime() * script.speed;
    var newY1 = script.basePosition[0].y + Math.sin(t+randomSync) * script.amplitude;
    var newPos1 = new vec3(script.basePosition[0].x, newY1, script.basePosition[0].z);
    script.Pasteque3DUI[0].getTransform().setLocalPosition(newPos1);
}
*/

/*
FadeBackgroundWithoutSeganim.OnStart=function()
{

}
FadeBackgroundWithoutSeganim.OnEnd=function()
{

}
*/

//________Parallax________//
/*
var initVecPos= new vec2(0,0)
function StartParallax(){
    print("parallaxStarted");
    global.parallaxManager.Subscribe(UpdateParallax);
}
function UpdateParallax(offsetX)
{
    
    let posXCanap = (initVecPos.x + offsetX) * -script.strenghtX
    let posXTv = (initVecPos.x + offsetX) * -script.strenghtX
    let posXBitmoji = (initVecPos.x + offsetX) * -script.strenghtX
    
    //let posY = (initVecPos.y + offsetY)
    
    //var screenTransformCanap = script.Objectparallax[0]
    if(countPannel==0)
    {
        var screenTransform = script.Objectparallax[0].getComponent("Component.ScreenTransform");
        var currentPos = screenTransform.anchors.getCenter();
        screenTransform.anchors.setCenter(new vec2(posXCanap, currentPos.y));
    }
    /*
    //3D
    var rotobjectBack =script.ObjectparallaxBackground.getTransform().getLocalRotation().toEulerAngles();
    var rotationYBack = quat.fromEulerAngles(rotobjectBack.x, yAngleBack, rotobjectBack.z);
    //script.Objectparallax[0].getTransform().setWorldPosition(new vec3(posXCanap,posobject.y,posobject.z))

    script.ObjectparallaxBackground.getTransform().setLocalRotation(rotationYBack);
    */
    

    //let clampY = clamp(posY * -script.strenghtY, -54, 54)
    //print(posXCanap + " " + posXCanap)
//}
/*
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}*/
//___________________________Animations_________________________//

//fadeBag.AddTimeCodeEvent(0.4, function(){  ///HERE/// })

const FadeHintTapanim = new Animation(script.getSceneObject(), 1, FadeHintTap);
FadeHintTapanim.Easing=QuadraticInOut;

function FadeHintTap(ratio)
{
    script.Hints[0].getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
    script.Hints[1].getComponent("Component.Text").textFill.color=new vec4(1, 1, 1, ratio);
}


const ScaleButtonAnim = new Animation(script.getSceneObject(), 0.15, ScaleButton,RepeatMode.PingPong);
ScaleButtonAnim.Easing=QuadraticInOut;

function ScaleButton(ratio)
{    
    //print(ratio)
    script.Buttons[idToGoTo].getComponent("Component.Image").mainPass.contrast=(-(ratio)*0.4)+1;
    script.Buttons[idToGoTo].getComponent("Component.Image").getTransform().setLocalScale(
    new vec3(1, 1, 1).uniformScale((-(ratio)*0.2)+1));
}   

