//@input SceneObject parent
//@input SceneObject Bottle
//@input SceneObject[] Tuto
//@input SceneObject[] EmptyBottle
//@input SceneObject[] EmptyBottleFlavour
//@input Component.AudioComponent Sound
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
const TapTutoCaller = script.subScene.CreateCaller("TapTuto");
//exemple : outroCaller.Call()
//________Listener________//
//const TapTutoListener = script.subScene.CreateListener("TapTuto", OnOutroStart);

const SodaPressListener = script.subScene.CreateListener("SodaPress", MouvSoda);
const BottleCenterListener = script.subScene.CreateListener("BottleCenter", GoCenter);
const FlavourPressedListener = script.subScene.CreateListener("FlavorChoose", MouvSodaFlavour);
const GoUpCabineListener = script.subScene.CreateListener("GoUpCabine", GoCenter);
const RetryListener = script.subScene.CreateListener("Retry", Retry);


//________DelayEvent________//
var GoCenterBottleEvent = script.subScene.CreateEvent("DelayedCallbackEvent", GoCenterBottle);
//global.currentCyclePhoto=0;

//exemple : script.WellDone.play(1);
//var randomInt = Math.floor(Math.random() * 4);//0-3
var idToGoTo=0
var idToGoToFlavour=0
var posbottle=new vec2(0,-1.5)
//_________________________Director functions_____________________//
function Start() {}
function OnLateStart() {
    FadeTutoanim.Start()
    ScaleButtonAnim.Start(1)
    //CloseButtonImage=script.ButtonClose.getComponent("Component.Image");
    //CloseButtonInteraction=script.ButtonClose.getComponent("Component.InteractionComponent");

}
function Update() {
    FloatY()
}
function Stop() {
    MouvBottleanim.Reset()
    FadeTutoanim.Reset()
    script.Tuto[0].getComponent("Component.InteractionComponent").enabled = true;

    script.Bottle.getComponent("Component.ScreenTransform").anchors.setCenter(posbottle);


}
//___________________________Functions__________________________//


//script.Parti.asset.properties["KillParti"] = 1

//________Button________//

script.Tuto[0].getComponent("Component.InteractionComponent").onTap.add(function() {
script.Tuto[0].getComponent("Component.InteractionComponent").enabled = false;
print("Tuto")
TapTutoCaller.Call()
GoCenter()
script.Sound.play(1)
FadeTutoanim.GoTo(0)

   
});
//________FunctionsPerso________//
function Retry()
{
    //print("RETRYYY")
    
    script.Bottle.getComponent("Component.ScreenTransform").anchors.setCenter(posbottle);

    script.Tuto[0].getComponent("Component.InteractionComponent").enabled = true;
    OnLateStart()
}
function MouvSoda(id)
{
    idToGoTo=id
    print("IdUpdate")
    MouvBottleanim.Start()
    //GoCenterBottleEvent.event.reset(2)
}

function MouvSodaFlavour(id)
{
    idToGoToFlavour=id
    print("IdUpdate")
    MouvBottleFlavouranim.Start()
}
function GoCenterBottle()
{
    GoCenter()
}
function GoCenter()
{
    idToGoTo=1
    MouvBottleanim.Start()
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

//@input float speed = 1.0 {"widget":"slider", "min":0, "max":10, "step":0.01}
//@input float amplitude = 10.0 {"widget":"slider", "min":0, "max":50, "step":0.01}
//@input vec3[] basePosition = {0,0,0}
//print(script.Pasteque3DUI[5].getTransform().getLocalPosition())
/*
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

//________Float________//
function FloatY() {
    var center = script.Bottle.getComponent("Component.ScreenTransform").anchors.getCenter(); // vec2
    var t = getTime();
    var amplitude = 0.0010;
    var frequency = 2.0;
    // Animation flottante sur l'axe Y autour du centre
    center.y = center.y + Math.sin(t * frequency) * amplitude;
    // Appliquer la nouvelle position au ScreenTransform
    script.Bottle.getComponent("Component.ScreenTransform").anchors.setCenter(center);
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

const FadeBackgroundWithoutSeganim = new Animation(script.getSceneObject(), script.durationFade, FadeBackgroundWithoutSeg);
FadeBackgroundWithoutSeganim.Easing=QuadraticInOut;
function FadeBackgroundWithoutSeg(ratio)
{
    script.ImitateElio.getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
    script.ImageOrtho[1].getComponent("Component.Text").textFill.color=new vec4(1, 1, 1, ratio);

}

const FadeTutoanim = new Animation(script.getSceneObject(), 1, FadeTuto);
FadeTutoanim.Easing=QuadraticInOut;
function FadeTuto(ratio)
{
    //script.Tuto[0].getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
    script.Tuto[1].getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
    script.Tuto[3].getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
    script.Tuto[2].getComponent("Component.Text").textFill.color=new vec4(1, 1, 1, ratio);

}

const MouvBottleanim = new Animation(script.getSceneObject(), 1, MouvBottle);
MouvBottleanim.Easing=QuadraticInOut;
function MouvBottle(ratio)
{
    var currentPos = script.Bottle.getComponent("Component.ScreenTransform").anchors.getCenter();
    var posGoTo = script.EmptyBottle[idToGoTo].getComponent("Component.ScreenTransform").anchors.getCenter();
    var result = vec2.lerp(currentPos, posGoTo, ratio);
    script.Bottle.getComponent("Component.ScreenTransform").anchors.setCenter(result);
    //script.Bottle.getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
}

const MouvBottleFlavouranim = new Animation(script.getSceneObject(), 1, MouvBottleFlavour);
MouvBottleFlavouranim.Easing=QuadraticInOut;
function MouvBottleFlavour(ratio)
{
    var currentPos = script.Bottle.getComponent("Component.ScreenTransform").anchors.getCenter();
    var posGoTo = script.EmptyBottleFlavour[idToGoToFlavour].getComponent("Component.ScreenTransform").anchors.getCenter();
    var result = vec2.lerp(currentPos, posGoTo, ratio);
    script.Bottle.getComponent("Component.ScreenTransform").anchors.setCenter(result);
    //script.Bottle.getComponent("Component.Image").mainPass.baseColor=new vec4(1, 1, 1, ratio);
}

const ScaleButtonAnim = new Animation(script.getSceneObject(), 0.5, ScaleButton,RepeatMode.PingPong);
ScaleButtonAnim.Easing=QuadraticInOut;

function ScaleButton(ratio)
{    
    //print(ratio)
    script.Tuto[3].getComponent("Component.Image").getTransform().setLocalScale(
    new vec3(1, 1, 1).uniformScale(((ratio)*0.6)+1));
}  

