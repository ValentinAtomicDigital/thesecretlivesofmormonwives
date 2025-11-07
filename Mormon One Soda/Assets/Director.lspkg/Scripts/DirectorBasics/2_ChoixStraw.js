//@input SceneObject parent
//@input SceneObject Hint
//@input SceneObject[] emptyStraw
//@input SceneObject[] Straw
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
const ChooseStrawCaller = script.subScene.CreateCaller("ChooseStraw");
//exemple : outroCaller.Call()
//________Listener________//
const RetryListener = script.subScene.CreateListener("Retry", Retry);

const ChooseStrawListener = script.subScene.CreateListener("ChooseStraw", ChooseStraw);
const FlavorChooseListener = script.subScene.CreateListener("FlavorChoose", FlavorChoose);
const FadeOutStrawListener = script.subScene.CreateListener("FadeOutStraw", FadeOutStraw);


//________DelayEvent________//
var StrawUpToBottleEvent = script.subScene.CreateEvent("DelayedCallbackEvent", StrawUpToBottle);
var StrawInLeftRigthEvent = script.subScene.CreateEvent("DelayedCallbackEvent", StrawInLeftRigth);


//exemple : script.WellDone.play(1);
//var randomInt = Math.floor(Math.random() * 4);//0-3
var idToGoTo=0
var posstraw1=new vec2(-0.6,-0.4)
var posstraw2=new vec2(0.6,-0.4)
//_________________________Director functions_____________________//
function Start() {}
function OnLateStart() {
    //CloseButtonImage=script.ButtonClose.getComponent("Component.Image");
    //CloseButtonInteraction=script.ButtonClose.getComponent("Component.InteractionComponent");

}
function Update() {
    //print(    script.Straw[1].getComponent("Component.ScreenTransform").anchors.getCenter())

}
function Stop() {
    idToGoTo=0
    script.Straw[0].getComponent("Component.InteractionComponent").enabled = false;
    script.Straw[1].getComponent("Component.InteractionComponent").enabled = false;
    var posRigthRigth = script.emptyStraw[5].getComponent("Component.ScreenTransform").anchors.getCenter();
    var posLeftLeft = script.emptyStraw[3].getComponent("Component.ScreenTransform").anchors.getCenter();
    script.Straw[0].getComponent("Component.ScreenTransform").anchors.setCenter(posLeftLeft);
    script.Straw[1].getComponent("Component.ScreenTransform").anchors.setCenter(posRigthRigth);


    FadeStraw1anim.Reset()
    FadeStraw2anim.Reset()
    FadeHintTextanim.Reset()
}
//___________________________Functions__________________________//


//script.Parti.asset.properties["KillParti"] = 1

//________Button________//

script.Straw[0].getComponent("Component.InteractionComponent").onTap.add(function() {
script.Straw[0].getComponent("Component.InteractionComponent").enabled = false;
   print("tapstraw1")
    FadeStraw2anim.GoTo(0)

   ChooseStrawCaller.Call(0)
});

script.Straw[1].getComponent("Component.InteractionComponent").onTap.add(function() {
script.Straw[1].getComponent("Component.InteractionComponent").enabled = false;
    print("tapstraw2")
    FadeStraw1anim.GoTo(0)
    ChooseStrawCaller.Call(1)
});
//________FunctionsPerso________//
function Retry()
{
    var posRigthRigth = script.emptyStraw[5].getComponent("Component.ScreenTransform").anchors.getCenter();
    var posLeftLeft = script.emptyStraw[3].getComponent("Component.ScreenTransform").anchors.getCenter();
    script.Straw[0].getComponent("Component.ScreenTransform").anchors.setCenter(posLeftLeft);
    script.Straw[1].getComponent("Component.ScreenTransform").anchors.setCenter(posRigthRigth);



}
function ChooseStraw(id)
{
    idToGoTo=id
    StrawUpToBottleEvent.event.reset(1)
    MouvStrawanim.Start()
    FadeHintTextanim.GoTo(0)
    MouvStrawLeftanim.GoTo(0)
    MouvStrawRigthanim.GoTo(0)
}

function FlavorChoose()
{
    script.Sound[0].play(1)
    StrawInLeftRigthEvent.event.reset(2)
    
    FadeStraw1anim.Start()
    FadeStraw2anim.Start()
    FadeHintTextanim.Start()
    script.Straw[0].getComponent("Component.InteractionComponent").enabled = true;
    script.Straw[1].getComponent("Component.InteractionComponent").enabled = true;
}
function StrawUpToBottle()
{
    MouvUpToBottleanim.Start()
}

function StrawInLeftRigth()
{
    MouvStrawLeftanim.Start()
    MouvStrawRigthanim.Start()

}

const MouvStrawanim = new Animation(script.getSceneObject(), 1, MouvStraw);
MouvStrawanim.Easing=QuadraticInOut;
function MouvStraw(ratio)
{
    var currentPos = script.Straw[idToGoTo].getComponent("Component.ScreenTransform").anchors.getCenter();
    var posGoTo = script.emptyStraw[0].getComponent("Component.ScreenTransform").anchors.getCenter();

    var result = vec2.lerp(currentPos, posGoTo, ratio);
    script.Straw[idToGoTo].getComponent("Component.ScreenTransform").anchors.setCenter(result);
    //script.Bottle.getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
}


const MouvStrawRigthanim = new Animation(script.getSceneObject(), 1, MouvStrawRigth);
MouvStrawRigthanim.Easing=QuadraticInOut;
function MouvStrawRigth(ratio)
{
    //var currentPos = script.Straw[1].getComponent("Component.ScreenTransform").anchors.getCenter();
    var posRigth = script.emptyStraw[4].getComponent("Component.ScreenTransform").anchors.getCenter();
    var posRigthRigth = script.emptyStraw[5].getComponent("Component.ScreenTransform").anchors.getCenter();

    var result = vec2.lerp(posRigthRigth, posRigth, ratio);
    script.Straw[1].getComponent("Component.ScreenTransform").anchors.setCenter(result);
    //script.Bottle.getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
}

const MouvStrawLeftanim = new Animation(script.getSceneObject(), 1, MouvStrawLeft);
MouvStrawLeftanim.Easing=QuadraticInOut;
function MouvStrawLeft(ratio)
{
    //var currentPos = script.Straw[1].getComponent("Component.ScreenTransform").anchors.getCenter();
    var posRigth = script.emptyStraw[2].getComponent("Component.ScreenTransform").anchors.getCenter();
    var posRigthRigth = script.emptyStraw[3].getComponent("Component.ScreenTransform").anchors.getCenter();

    var result = vec2.lerp(posRigthRigth, posRigth, ratio);
    script.Straw[0].getComponent("Component.ScreenTransform").anchors.setCenter(result);
    //script.Bottle.getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
}

const MouvUpToBottleanim = new Animation(script.getSceneObject(), 2, MouvUpToBottle);
MouvUpToBottleanim.Easing=ElasticOut;
function MouvUpToBottle(ratio)
{
    var posUp = script.emptyStraw[1].getComponent("Component.ScreenTransform").anchors.getCenter();
    var posBottle = script.emptyStraw[0].getComponent("Component.ScreenTransform").anchors.getCenter();

    var result = vec2.lerp(posUp, posBottle, ratio);
    script.Straw[idToGoTo].getComponent("Component.ScreenTransform").anchors.setCenter(result);
    //script.Bottle.getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
}
function FadeOutStraw()
{
    FadeStraw1anim.GoTo(0)
    FadeStraw2anim.GoTo(0)
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

const FadeStraw1anim = new Animation(script.getSceneObject(), 1, FadeStraw1);
FadeStraw1anim.Easing=QuadraticInOut;
function FadeStraw1(ratio)
{
    script.Straw[0].getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio*220/255);
}
const FadeStraw2anim = new Animation(script.getSceneObject(), 1, FadeStraw2);
FadeStraw2anim.Easing=QuadraticInOut;
function FadeStraw2(ratio)
{
    script.Straw[1].getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio*220/255);
}
const FadeHintTextanim = new Animation(script.getSceneObject(), 1, FadeHintText);
FadeHintTextanim.Easing=QuadraticInOut;
function FadeHintText(ratio)
{
    script.Hint.getComponent("Component.Text").textFill.color=new vec4(1, 1, 1, ratio);
}


 const ScaleButtonAnim = new Animation(script.getSceneObject(), script.durationFadeButton, ScaleButton,RepeatMode.PingPong);
ScaleButtonAnim.Easing=ElasticIn;

function ScaleButton(ratio)
{    

    //script.HeadDogButton[currentIdDog].getComponent("Component.Image").Scale=new vec2(1-ratio,1-ratio);
    script.HeadDogButton[currentIdDog].getComponent("Component.Image").getTransform().setLocalScale(new vec3(1, 1, 1).uniformScale(((1-ratio)*0.15)+0.85));

}   

