//@input SceneObject parent
//@input SceneObject[] FlavorButton
//@input Asset.Texture[] Flavortex
//@input Component.AudioComponent[] Sound
//input Component.Image ImitateElio
//input Asset.Texture Flashvideo
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
const FlavorChooseCaller = script.subScene.CreateCaller("FlavorChoose");
//exemple : outroCaller.Call()
//________Listener________//
const FlavorChooseListener = script.subScene.CreateListener("FlavorChoose", FlavorChoose);
const GoUpCabineListener = script.subScene.CreateListener("GoUpCabine", ShowFlavor);
const RetryListener = script.subScene.CreateListener("Retry", Retry);


//________DelayEvent________//
//var CaptureScreenEvent = script.subScene.CreateEvent("DelayedCallbackEvent", getFullScreenText);
//global.currentCyclePhoto=0;
var delayedEndVideoCherryEvent = script.subScene.CreateEvent("DelayedCallbackEvent", delayedEndVideoCherry);
var delayedEndVideoCocoEvent = script.subScene.CreateEvent("DelayedCallbackEvent", delayedEndVideoCoco);
var delayedEndVideoLimeEvent = script.subScene.CreateEvent("DelayedCallbackEvent", delayedEndVideoLime);
var delayedEndVideoOrangeEvent = script.subScene.CreateEvent("DelayedCallbackEvent", delayedEndVideoOrange);
var delayedEndVideoVanillaEvent = script.subScene.CreateEvent("DelayedCallbackEvent", delayedEndVideoVanilla);


//exemple : script.WellDone.play(1);
//var randomInt = Math.floor(Math.random() * 4);//0-3
let controlSyrupCherryVideo = script.Flavortex[0].control
let controlSyrupCocoVideo = script.Flavortex[1].control
let controlSyrupLimeVideo = script.Flavortex[2].control
let controlSyrupOrangeVideo = script.Flavortex[3].control
let controlSyrupVanillaVideo = script.Flavortex[4].control

global.FlavorChoose=0;

//_________________________Director functions_____________________//
function Start() {}
function OnLateStart() {
    //CloseButtonImage=script.ButtonClose.getComponent("Component.Image");
    //CloseButtonInteraction=script.ButtonClose.getComponent("Component.InteractionComponent");

}
function Update() {}
function Stop() {
    FadeFlavorButtonanim.Reset()
    DesactivationButtonFlavor()
}
//___________________________Functions__________________________//


//script.Parti.asset.properties["KillParti"] = 1

//________Button________//

script.FlavorButton[0].getComponent("Component.InteractionComponent").onTap.add(function() {
//script._restartButton.getComponent("Component.InteractionComponent").enabled = false;
   FlavorChooseCaller.Call(0)
   
});

script.FlavorButton[1].getComponent("Component.InteractionComponent").onTap.add(function() {
//script._restartButton.getComponent("Component.InteractionComponent").enabled = false;
   FlavorChooseCaller.Call(1)
});

script.FlavorButton[2].getComponent("Component.InteractionComponent").onTap.add(function() {
//script._restartButton.getComponent("Component.InteractionComponent").enabled = false;
   FlavorChooseCaller.Call(2)
});

script.FlavorButton[3].getComponent("Component.InteractionComponent").onTap.add(function() {
//script._restartButton.getComponent("Component.InteractionComponent").enabled = false;
   FlavorChooseCaller.Call(3)
});

script.FlavorButton[4].getComponent("Component.InteractionComponent").onTap.add(function() {
//script._restartButton.getComponent("Component.InteractionComponent").enabled = false;
   FlavorChooseCaller.Call(4)
});
//________FunctionsPerso________//

function Retry()
{
    switch (global.FlavorChoose){
        case 0:
        global.ResumeVideo(controlSyrupCherryVideo)
        break;
        
        case 1:
        global.ResumeVideo(controlSyrupCocoVideo)
        break;
        
        case 2:
        global.ResumeVideo(controlSyrupLimeVideo)
        break;
        
        case 3:
        global.ResumeVideo(controlSyrupOrangeVideo)
        break;
        
        case 4:
        global.ResumeVideo(controlSyrupVanillaVideo)
        break;
    }
    /*
    global.ResumeVideo(controlSyrupCherryVideo, 1)
    global.ResumeVideo(controlSyrupCocoVideo, 1)
    global.ResumeVideo(controlSyrupLimeVideo, 1)
    global.ResumeVideo(controlSyrupOrangeVideo, 1)
    global.ResumeVideo(controlSyrupVanillaVideo, 1)*/

}
function FlavorChoose(id)
{
    script.Sound[1].play(1)
    global.FlavorChoose=id
    print("tap"+ id)
    DesactivationButtonFlavor()
    FadeFlavorButtonanim.GoTo(0)
    switch (id){
        case 0:
        global.PlayVideo(controlSyrupCherryVideo, 1)
        delayedEndVideoCherryEvent.event.reset(2)
        break;
        
        case 1:
        global.PlayVideo(controlSyrupCocoVideo, 1)
        delayedEndVideoCocoEvent.event.reset(2)
        break;
        
        case 2:
        global.PlayVideo(controlSyrupLimeVideo, 1)
        delayedEndVideoLimeEvent.event.reset(2)
        break;
        
        case 3:
        global.PlayVideo(controlSyrupOrangeVideo, 1)
        delayedEndVideoOrangeEvent.event.reset(2)
        break;
        
        case 4:
        global.PlayVideo(controlSyrupVanillaVideo, 1)
        delayedEndVideoVanillaEvent.event.reset(2.1)
        break;
    }

    
}

function ShowFlavor()
{
        script.Sound[0].play(1)

    FadeFlavorButtonanim.Start()
    ActivationButtonFlavor()
}
function delayedEndVideoCherry()
{
    if(controlSyrupCherryVideo.status != VideoStatus.Preparing){
        global.PauseVideo(controlSyrupCherryVideo)
    }
}
function delayedEndVideoCoco()
{
    if(controlSyrupCocoVideo.status != VideoStatus.Preparing){
        global.PauseVideo(controlSyrupCocoVideo)
    }
}
function delayedEndVideoLime()
{
    if(controlSyrupLimeVideo.status != VideoStatus.Preparing){
        global.PauseVideo(controlSyrupLimeVideo)
    }
}
function delayedEndVideoOrange()
{
    if(controlSyrupOrangeVideo.status != VideoStatus.Preparing){
        global.PauseVideo(controlSyrupOrangeVideo)
    }
}
function delayedEndVideoVanilla()
{
    if(controlSyrupVanillaVideo.status != VideoStatus.Preparing){
        global.PauseVideo(controlSyrupVanillaVideo)
    }
}

function DesactivationButtonFlavor()
{
    script.FlavorButton[0].getComponent("Component.InteractionComponent").enabled = false;
    script.FlavorButton[1].getComponent("Component.InteractionComponent").enabled = false;
    script.FlavorButton[2].getComponent("Component.InteractionComponent").enabled = false;
    script.FlavorButton[3].getComponent("Component.InteractionComponent").enabled = false;
    script.FlavorButton[4].getComponent("Component.InteractionComponent").enabled = false;
}

function ActivationButtonFlavor()
{
    script.FlavorButton[0].getComponent("Component.InteractionComponent").enabled = true;
    script.FlavorButton[1].getComponent("Component.InteractionComponent").enabled = true;
    script.FlavorButton[2].getComponent("Component.InteractionComponent").enabled = true;
    script.FlavorButton[3].getComponent("Component.InteractionComponent").enabled = true;
    script.FlavorButton[4].getComponent("Component.InteractionComponent").enabled = true;
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

const FadeFlavorButtonanim = new Animation(script.getSceneObject(), 1, FadeFlavorButton);
FadeFlavorButtonanim.Easing=QuadraticInOut;

function FadeFlavorButton(ratio)
{
    script.FlavorButton[0].getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
    script.FlavorButton[1].getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
    script.FlavorButton[2].getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
    script.FlavorButton[3].getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
    script.FlavorButton[4].getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
    script.FlavorButton[5].getComponent("Component.Text").textFill.color=new vec4(1, 1, 1, ratio);

}


 const ScaleButtonAnim = new Animation(script.getSceneObject(), script.durationFadeButton, ScaleButton,RepeatMode.PingPong);
ScaleButtonAnim.Easing=ElasticIn;

function ScaleButton(ratio)
{    

    //script.HeadDogButton[currentIdDog].getComponent("Component.Image").Scale=new vec2(1-ratio,1-ratio);
    script.HeadDogButton[currentIdDog].getComponent("Component.Image").getTransform().setLocalScale(new vec3(1, 1, 1).uniformScale(((1-ratio)*0.15)+0.85));

}   

