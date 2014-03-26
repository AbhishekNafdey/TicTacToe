/**
 * Created by Abhishek on  19/03/14.
 */

(function(){
    "use strict"

    function TTTUtil(){

    }
    TTTUtil.prototype.getObject = function(ID){

        if (typeof (ID) === "string"){
            var obj =  document.getElementById(ID);
            if(obj === null){
                return false
            }else{
                return obj;
            }

        }else {
            return ID;
        }

    }

    TTTUtil.prototype.bindEvents= function(elem,eventName,callBack,context,arg){

        if (elem.addEventListener){
            if(context){
                document.addEventListener (eventName,function(e){
                    if(e.target == elem){
                        var parameter  = arg || [];
                        parameter.unshift(e);
                        callBack.apply(context,parameter);
                    }
                },false);
            }else{
                document.addEventListener (eventName,function(e){
                    if(e.target == elem){
                        callBack();
                    }
                },false);
            }

        }else if (elem.attachEvent){
            if(context){
                elem.attachEvent ('on'+eventName,function(){
                    if(e.target == elem){
                        var parameter  = arg || [];
                        parameter.unshift(e);
                        callBack.apply(context,parameter);
                    }
                });
            }else{
                elem.attachEvent ('on'+eventName,function(e){
                    if(e.target == elem){
                        callBack();
                    }
                });
            }

        }
    }



    window.TTTUtil = new TTTUtil;
})()
