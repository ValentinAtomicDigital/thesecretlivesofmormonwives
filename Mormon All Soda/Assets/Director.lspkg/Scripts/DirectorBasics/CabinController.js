//@input SceneObject parent
//@input SceneObject Cabin
//@input SceneObject[] Empty
//@input SceneObject[] Soda
//input Component.AudioComponent WellDone
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
const GoUpCabineCaller = script.subScene.CreateCaller("GoUpCabine");
//exemple : outroCaller.Call()
//________Listener________//
const SodaPressListener = script.subScene.CreateListener("SodaPress", SodaPress);
const FlavourNextPressedListener = script.subScene.CreateListener("NextFlavoor", FlavourNextPressed);
const RetryListener = script.subScene.CreateListener("Retry", Retry);


//________DelayEvent________//
var GoUpCabinEvent = script.subScene.CreateEvent("DelayedCallbackEvent", GoUpCabin);
var GoUpCabinFlavorEvent = script.subScene.CreateEvent("DelayedCallbackEvent", GoUpCabinFlavor);
//global.currentCyclePhoto=0;

//exemple : script.WellDone.play(1);
//var randomInt = Math.floor(Math.random() * 4);//0-3
var idToGoTo=0 //0=Down 1=Up
//_________________________Director functions_____________________//
function Start() {}
function OnLateStart() {
    MouvCabinanim.GoTo(0)
    FadeSodaCabinanim.Start(1)

    //CloseButtonImage=script.ButtonClose.getComponent("Component.Image");
    //CloseButtonInteraction=script.ButtonClose.getComponent("Component.InteractionComponent");

}
function Update() {}
function Stop() {
    FadeSodaCabinanim.Reset()

    MouvCabinanim.JumpTo(1)
}
//___________________________Functions__________________________//


//script.Parti.asset.properties["KillParti"] = 1
/*
//________Button________//

script._restartButton.getComponent("Component.InteractionComponent").onTap.add(function() {
script._restartButton.getComponent("Component.InteractionComponent").enabled = false;
   
});*/
//________FunctionsPerso________//
function Retry()
{
    OnLateStart()
}
function SodaPress()
{
    GoUpCabinEvent.event.reset(3)
    //MouvCabinanim.Start()
}

function FlavourNextPressed()
{
    //GoUpCabinEvent.event.reset(3)
    GoUpCabinFlavorEvent.event.reset(0.5)

}

function GoUpCabinFlavor()
{
    //GoUpCabineCaller.Call()
    MouvCabinanim.Start()
}

function GoUpCabin()
{
    GoUpCabineCaller.Call()
    FadeSodaCabinanim.GoTo(0)

    //MouvCabinanim.Start()
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

const MouvCabinanim = new Animation(script.getSceneObject(), 1, MouvCabin);
MouvCabinanim.Easing=QuadraticInOut;
function MouvCabin(ratio)
{
    var currentPos = script.Cabin.getComponent("Component.ScreenTransform").anchors.getCenter();
    var posUp = script.Empty[1].getComponent("Component.ScreenTransform").anchors.getCenter();
    var posDown = script.Empty[0].getComponent("Component.ScreenTransform").anchors.getCenter();

    var result = vec2.lerp(posDown, posUp, ratio);
    script.Cabin.getComponent("Component.ScreenTransform").anchors.setCenter(result);
    //script.Bottle.getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
}

//fadeBag.AddTimeCodeEvent(0.4, function(){  ///HERE/// })

const FadeBackgroundWithoutSeganim = new Animation(script.getSceneObject(), script.durationFade, FadeBackgroundWithoutSeg);
FadeBackgroundWithoutSeganim.Easing=QuadraticInOut;

function FadeBackgroundWithoutSeg(ratio)
{
    //print("Test2");
    script.ImitateElio.getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
    script.ImageOrtho[1].getComponent("Component.Text").textFill.color=new vec4(1, 1, 1, ratio);
}

const FadeSodaCabinanim = new Animation(script.getSceneObject(), 1, FadeSodaCabin);
FadeSodaCabinanim.Easing=QuadraticInOut;

function FadeSodaCabin(ratio)
{
    for(i=0;i<script.Soda.length;i++)
    {
        script.Soda[i].getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
    }
}


 

