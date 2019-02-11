class library {

    constructor(selector){
        if(selector instanceof HTMLElement || selector instanceof Node ){ 
             this.currEl =  selector  
        }
        else{
            this.currEl = this.get(selector);
        }
    }

    get  ( selector )  { 

        if( ! ( typeof selector === 'string' || selector instanceof String ) ){
            return;
        }

        if( selector[0] === '#' ){
            this.currEl = document.querySelector( selector );
            return this.currEl;    
        }
        this.currEl = Array.from( document.querySelectorAll( selector ) );
        return this.currEl
    }

    remove  (  ) {
        var el = this.currEl;
        Array.isArray( el ) ? el.map( i => i.remove() ) : el.remove();
        this.currEl= null;
    }

    createElement  ( tagName, props )  
    {
        //this.currEl = this.setAttrsToElement( document.createElement( tagName ), props);
        return this.setAttrsToElement( document.createElement( tagName ), props);
        //return this;
    }

    append ( tagName, props )  {
        if( tagName == undefined || tagName == null ){
            console.log('%c TagName invalid! ', ' color: red');
            return;
        }
        //this.currEl = 
          Array.isArray( this.currEl ) ? this.currEl.map( i =>  i.appendChild(  this.createElement( tagName, props ) ) )
                            : this.currEl.appendChild( this.createElement( tagName, props ) );
        return this;
    }

    modify  ( props )  {
        
        Array.isArray( this.currEl ) ? this.currEl.map( i =>  this.setAttrsToElement( i, props ) ) 
                                     : this.setAttrsToElement( this.currEl, props);  
        return this;
    }

    addClassToElementClassList(classes){
        if(classes == undefined || classes == null){
            return;
        }
        Array.isArray(classes) ? classes.map(i=>this.currEl.classList.add( i )) :  this.currEl.classList.add( classes )
    }
    elementsClassListHasClass(eclass){
        if(eclass == undefined || eclass == null){
            return;
        }
        return this.currEl.classList.contains(eclass);
    }

    modifyStyles (  props )  {
        var   setStylesToElement =( target, props )=>{
            for( var key in props ){
                target.style[ key ] = props[ key ];
            }            
            return target;
        }
        Array.isArray( this.currEl ) ? this.currEl.map( i =>  setStylesToElement( i, props ) ) 
                            : setStylesToElement( this.currEl, props);  
    }

    setAttrsToElement ( target, props ){
        for( var key in props ){
            if (key =='innerText'){
                target.innerText = props[key]; 

                continue;
            }
            else if (key =='innerHTML'){
                target.innerHTML = props[key]; 
                continue;
            }
            target.setAttribute( key, props[key] )
        }
        
        return target;
    }

    getParent  ()  {
        this.currEl =  Array.isArray( this.currEl )  ? this.currEl.map( i => i.parentElement ) 
                                                     : this.currEl.parentElement;  
        return this;
    }
    getNextSibling  ()  {
        this.currEl =  Array.isArray( this.currEl )  ? this.currEl.map( i => i.nextSibling ) 
                                                     : this.currEl.nextSibling;  
        return this;
    }
    getPrevSibling  ()  {
        this.currEl =  Array.isArray( this.currEl )  ? this.currEl.map( i => i.previousSibling ) 
                                                     : this.currEl.previousSibling;  
        return this;
    }
    getChildren  ()  {
        this.currEl =  Array.isArray( this.currEl )  ? this.currEl.map( i => i.children ) 
                                                     : this.currEl.children;  
        return this;
    }

    setEventHandler  (props)  {
        var setEventToEventHandler = ( target ,props ) => {
            for( var key in props ){
                target[key] = props[key] ;
            }
        }
        Array.isArray( this.currEl )  ? this.currEl.map( i => setEventToEventHandler( i, props ) ) 
                                                     : setEventToEventHandler(this.currEl , props);  

        return this;
    }
}
const $ = (sel) => { return new library(sel) }

//var  e =  new ir();

//(()=>{
//    console.log(e)//console.log('%c Some Error! ', ' color: red');
//})();

