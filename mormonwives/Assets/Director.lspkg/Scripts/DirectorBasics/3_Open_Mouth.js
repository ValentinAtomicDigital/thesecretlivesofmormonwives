//@input SceneObject parent
//@input SceneObject Hint
//@input SceneObject ButtonRetry
//@input Component.AudioComponent[] Sound
//input Component.Image ImitateElio
//@input Asset.Material[] Videos
//@input Asset.Texture[] VideosToStop
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
const FadeOutStrawCaller = script.subScene.CreateCaller("FadeOutStraw");
const RetryCaller = script.subScene.CreateCaller("Retry");
//exemple : outroCaller.Call()
//________Listener________//
const ChooseStrawListener = script.subScene.CreateListener("ChooseStraw", StrawChoosen);
//const RetryListener = script.subScene.CreateListener("Retry", Retry);

//________DelayEvent________//
var FadeOutStrawEvent = script.subScene.CreateEvent("DelayedCallbackEvent", FadeOutStraw);
var DelaySoundDrinkEvent = script.subScene.CreateEvent("DelayedCallbackEvent", DelaySoundDrink);
//global.currentCyclePhoto=0;

//exemple : script.WellDone.play(1);
//var randomInt = Math.floor(Math.random() * 4);//0-3
var drinkable=false
//_________________________Director functions_____________________//
function Start() {}
function OnLateStart() {
    //CloseButtonImage=script.ButtonClose.getComponent("Component.Image");
    //CloseButtonInteraction=script.ButtonClose.getComponent("Component.InteractionComponent");

}
function Update() {

    
}
function Stop() {
    script.Sound[2].stop(1)
    script.Sound[3].stop(1)
    script.ButtonRetry.getComponent("Component.InteractionComponent").enabled = false;
    RevealDrinkanim.JumpTo(1)
    FadeHinttextanim.Reset()
    drinkable=false
    FadeButtonRetryanim.Reset()

    for(i=0;i<script.VideosToStop.length;i++)
    {        
        var controlvideos = script.VideosToStop[i].control
        if(controlvideos.status != VideoStatus.Preparing)
        {
            print("AHHHH")
            StopVideo(controlvideos)
        }
    }
}
//___________________________Functions__________________________//

script.createEvent("MouthOpenedEvent").bind(
    function() 
    {
        if(drinkable==true)
        {
            DelaySoundDrinkEvent.event.reset(1.2)
            print("mouth just opened")
            //FadeOut gradient boisson
            FadeOutStrawEvent.event.reset(2)
            drinkable=false
            FadeHinttextanim.GoTo(0)
            RevealDrinkanim.GoTo(0)
        }
        
    }  
);
function DelaySoundDrink()
{
    script.Sound[0].play(1)
}
function StrawChoosen()
{
    script.Sound[2].play(-1)
    script.Sound[2].volume=0.2
    script.Sound[3].volume=0
    
    FadeHinttextanim.Start()
    drinkable=true
}
function FadeOutStraw()
{
    script.Sound[1].play(1)

    FadeOutStrawCaller.Call()
    script.ButtonRetry.getComponent("Component.InteractionComponent").enabled = true;
    FadeButtonRetryanim.Start()
}
//script.Parti.asset.properties["KillParti"] = 1
/*
let controlTwix = script.twixMat.mainPass.baseTex.control
global.PlayVideo(controlTwix, 1)
global.ResumeVideo(controlTwix)
delayedEndVideo.event.reset(controlTwix.totalDuration-0.5)
if(controlTwix.status != VideoStatus.Preparing){
    global.PauseVideo(controlTwix)
    onceLoading = true
}
*/

//________Button________//

script.ButtonRetry.getComponent("Component.InteractionComponent").onTap.add(function() {
script.ButtonRetry.getComponent("Component.InteractionComponent").enabled = false;
    FadeButtonRetryanim.GoTo(0)
    RetryCaller.Call()
    RevealDrinkanim.JumpTo(1)
    script.Sound[2].volume=0
    script.Sound[3].volume=1
});
//________FunctionsPerso________//

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

const FadeHinttextanim = new Animation(script.getSceneObject(), 1, FadeHinttext);
FadeHinttextanim.Easing=QuadraticInOut;

function FadeHinttext(ratio)
{
    script.Hint.getComponent("Component.Text").textFill.color=new vec4(1, 1, 1, ratio);
}

const RevealDrinkanim = new Animation(script.getSceneObject(), 4, RevealDrink);
RevealDrinkanim.Easing=QuadraticInOut;

function RevealDrink(ratio)
{
    for(i=0;i<script.Videos.length;i++)
    {
        print(ratio)
        script.Videos[i].mainPass.ratioAlpha=ratio;
    }
}

const FadeButtonRetryanim = new Animation(script.getSceneObject(), 1, FadeButtonRetry);
FadeButtonRetryanim.Easing=QuadraticInOut;

function FadeButtonRetry(ratio)
{
    script.ButtonRetry.getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);

}


 const ScaleButtonAnim = new Animation(script.getSceneObject(), script.durationFadeButton, ScaleButton,RepeatMode.PingPong);
ScaleButtonAnim.Easing=ElasticIn;

function ScaleButton(ratio)
{    

    //script.HeadDogButton[currentIdDog].getComponent("Component.Image").Scale=new vec2(1-ratio,1-ratio);
    script.HeadDogButton[currentIdDog].getComponent("Component.Image").getTransform().setLocalScale(new vec3(1, 1, 1).uniformScale(((1-ratio)*0.15)+0.85));

}   

