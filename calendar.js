var mainHolder   = $('#mainHolder');

var currentYear  = new Year(new Date().getFullYear());
var currentMonth =  currentYear.getCurrentMonth();


var reAssign = (o) =>{
    switch(o) {
        case 1:
                o = 'Mo';
            break;
        case 2:
                o = 'Tu';    
            break;
        case 3:
                o = 'We';   
            break;
        case 4:
                o =  'Th';    
            break;
        case 5:
                o =  'Fr'; 
            break;
        case 6:
                o =  'Sa';
            break;
        case 0:
                o =  'Su';
            break;
      }
      return o;
}


$('#close').setEventHandler({onclick: () =>{ $('#myModal').modifyStyles({display:'none'}) }});

var openModal = (day) => {
    $('#events').modify({innerHTML:""});
    $('#dayTime').modify({innerHTML:""});
    $('#eventName').modify({value:''});
    $('#eventDesc').modify({value:''});
    day = currentMonth.getDayById(day.id)[0];
    $('#myModal').modifyStyles({display:'block'});
    $('#dayTime').modify({ innerText : 'Events for '+ day.number +'  '+ currentMonth.name })

    if(day.Events.length > 0){
        day.Events.map(i=>
        {
            i= JSON.parse(i);
            $('#events').append('p', { innerHTML : i.name +'<br>' 
                                            //  +  i.date +'<br>'
                                                +  i.desc+ ' <hr/>'} )
        })
    }
    else {
        $('#events').append('p', { id:'pNoEls', innerHTML : 'No events for this day!<br>' });

    }
}
var addEventToDay = () =>{
    var currDay = $('.liDays').elementsClassListHasClass('active')[0];
    if(!currDay){
        alert('Day need to be selected');
        return;
}   
    currDay = currentMonth.getDayById(currDay.id)[0];
    currDay.Events.push( JSON.stringify(new Event(currDay.number,
                                    $('#eventName').currEl.value,
                                    currDay.UTCDate,  
                                    $('#eventDesc').currEl.value ) ));
    $('#dayTime').modify({ innerText : 'Events for '+ currDay.number +'  '+ currentMonth.name })
    $('#pNoEls').modify({innerHTML: ''});
    $('#events').append('p', { innerHTML : $('#eventName').currEl.value + '<br>' + $('#eventDesc').currEl.value + ' <hr/>' } ); 
}


var onDayClick = (event) =>{
        $('#mainEventForm').modifyStyles({display :'none'})

        $('.liDays').modify({class: 'liDays'}) ;
        if(!$(event.toElement).elementsClassListHasClass('active')){
                $(event.toElement).addClassToElementClassList('active') ;
        }
        openModal(event.toElement);
        
}
var onIncrYearClick = (  ) => { 
    currentYear = new Year(++currentYear.number) ;      
    reInitCalendar();  
};
var onDecsYearClick = (  ) =>{
    currentYear = new Year(--currentYear.number) ;      
    reInitCalendar();  
}

var buildMonthView =    () =>{
    $('.weekdays')  .append('li',{ id : 'Su' ,innerText : 'Su'})
                        .append('li',{ id : 'Mo' ,innerText : 'Mo'})
                            .append('li',{ id : 'Tu' ,innerText : 'Tu'})
                                .append('li',{ id : 'We' ,innerText : 'We'})
                                    .append('li',{ id : 'Th' ,innerText : 'Th'})
                                        .append('li',{ id : 'Fr' ,innerText : 'Fr'})
                                            .append('li',{ id : 'Sa' ,innerText : 'Sa'});

    currentYear.getCurrentMonth().days.forEach((element)=>{
        if( element.number == 1 && element.dayNumber != 0 )
        {
            var oter = '';
            for( var  o = 0;  o< element.dayNumber ;o++){
                oter =  reAssign(o);
                $('#'+oter).append( 'li', { class: 'liDays' ,innerHTML : '&nbsp;'})  ;
            }
            $('#'+element.dayNumberStr).append( 'li', { class:  ( element.isCurrent==true? 'liDays current' : 'liDays'),id : element.number , innerText : element.number })
        }       
        else{$('#'+element.dayNumberStr).append( 'li', { class:  ( element.isCurrent==true? 'liDays current' : 'liDays'),id : element.number , innerText : element.number })}
    }); 
}

var init = (viewParameter) => {
    //Header init
    $('#mainHolder').append('ul', {class : 'month'});
    $('.month').append('ul',{id: 'idMonth'});    
    $('#idMonth')
        .append('li',{class:'prev',innerHTML:'&#10094;'})
        .append('li',{class:'next',innerHTML:'&#10095;'})
        .append('li',{id:'yearHolder'});
    
    $('#yearHolder').append('span', { id :'yearSpan'} );
    $('#yearSpan').modify({ 'innerHTML' : currentYear.getHTMLTitle()   }) 


    $('.prev').setEventHandler({onclick : () => {
            try{
            currentMonth.isCurrent = false; 
            currentYear.months[currentMonth.number-2 ].isCurrent = true;
            currentMonth =  currentYear.getCurrentMonth();
            reInitCalendar(); } 
            catch(exc){
                currentYear = new Year(--currentYear.number) ;   
                currentYear.getCurrentMonth().isCurrent  = false   
                currentMonth.isCurrent = false; 
                currentYear.months[11].isCurrent = true;
                currentMonth =   currentYear.getCurrentMonth();
                reInitCalendar();  
            }
    }});
    $('.next').setEventHandler({onclick : () => {
           try{ 
                currentMonth.isCurrent = false; 
                currentYear.months[currentMonth.number ].isCurrent = true;
                currentMonth =  currentYear.getCurrentMonth();
                reInitCalendar();
            }
            catch(exc){
                currentYear = new Year(++currentYear.number) ;      
                currentMonth.isCurrent = false; 
                currentYear.months[0].isCurrent = true;
                currentMonth =  currentYear.getCurrentMonth();
                reInitCalendar();
            }
    }});
    // end
    // center area
    $('#mainHolder').append('ul',{class:'weekdays'});   
    switch(viewParameter){
        case    'Month' :
            buildMonthView();
            break;
        case    'Week'  :
            buildWeekView();
            break; 
    }

    $('.liDays').setEventHandler({onclick : (event) => onDayClick(event) } );  
   //end


   $('#incrY').setEventHandler({onclick: () =>  onIncrYearClick() });

   $('#decrY').setEventHandler({onclick: () =>  onDecsYearClick() });
   
   $('.liDays').setEventHandler({onclick : (event) => onDayClick(event) } );   
}


var reInitCalendar = () => {
    $('.weekdays').modify({innerHTML: ''})

    $('.weekdays')  .append('li',{ id : 'Su' ,innerText : 'Su'})
                        .append('li',{ id : 'Mo' ,innerText : 'Mo'})
                            .append('li',{ id : 'Tu' ,innerText : 'Tu'})
                                .append('li',{ id : 'We' ,innerText : 'We'})
                                     .append('li',{ id : 'Th' ,innerText : 'Th'})
                                        .append('li',{ id : 'Fr' ,innerText : 'Fr'})
                                            .append('li',{ id : 'Sa' ,innerText : 'Sa'});


    $('#yearSpan').modify({ 'innerHTML' :   currentYear.getHTMLTitle()   }) 
    $('#incrY').setEventHandler({onclick: () =>  onIncrYearClick() });
    $('#decrY').setEventHandler({onclick: () =>  onDecsYearClick() });

    $('.liDays').modify({innerHTML: ''})
    currentYear.getCurrentMonth().days.forEach((element)=>{
        if( element.number == 1 && element.dayNumber != 0 )
        {
            var oter = '';
            for( var  o = 0;  o< element.dayNumber ;o++){
                oter =  reAssign(o);
                $('#'+oter).append( 'li', { class: 'liDays' ,innerHTML : '&nbsp;'})  ;
            }
            $('#'+element.dayNumberStr).append( 'li', { class: ( element.isCurrent==true ? 'liDays current' : 'liDays') ,id : element.number , innerText : element.number })
        }       
        else{$('#'+element.dayNumberStr).append( 'li', { class: ( element.isCurrent==true? 'liDays current' : 'liDays') ,id : element.number , innerText : element.number })}
    }); 
    $('.liDays').setEventHandler({onclick : (event) => onDayClick(event) } );  
}



var initForm = () =>{
    $('#modal-footer').append('form',{id:'form'});
    $('#form')
        .append('p'     ,{innerText: 'Add event to selected day'})
        .append('input' ,{id: 'eventName' , placeHolder: 'Event Name' })
        .append('input' ,{id: 'eventDesc' , placeHolder: 'Event Description' })
        .append('button',{id: 'submitBtn', type:'button' , innerText: 'Submit' });   
    $('#submitBtn').setEventHandler({ onclick: ()=> addEventToDay() })
} 
initForm();

Date.prototype.format = (date) => {
    date = new Date(date);
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();
    var ret =  [date.getFullYear(),
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd
       ];
    return ret.join('-');
};

var onInputDayClick = (event) =>{
    $('#mainEventForm').modifyStyles({display :'none'})

    $('.iliDays').modify({class: 'iliDays'}) ;
    if(!$(event.toElement).elementsClassListHasClass('active')){
            $(event.toElement).addClassToElementClassList('active') ;
    }
    $('input[type=calendar]').modify({value : Date.prototype.format(currentMonth.getDayById(event.toElement.id)[0].UTCDate) });
    $('#Some').modifyStyles({display:'none'});
}
var onInputIncrYearClick = (  ) => { 
    currentYear = new Year(++currentYear.number) ;      
    reInitCalendar();  
};
var onInputDecsYearClick = (  ) =>{
    currentYear = new Year(--currentYear.number) ;      
    reInitCalendar();  
}

var reInitToInput = (input) => {
    $('.inputWeekdays').modify({innerHTML: ''})


    $('#inputYearSpan').modify({ 'innerHTML' : currentMonth.name+ '<br><span style="font-size:18px"> <i id="decrYInput" >&#6132;</i> '+currentYear.number+'<i id="incrYInput">&#6129;</i></span>'    }) 

    $('#incrYInput').setEventHandler({onclick: () =>  onIncrYearClick() });
    $('#decrYInput').setEventHandler({onclick: () =>  onDecsYearClick() });

    $('.iliDays').modify({innerHTML: ''})  
    $('.inputWeekdays')  .append('li',{ id : 'iSu' ,innerText : 'Su'})
    .append('li',{ id : 'iMo' ,innerText : 'Mo'})
        .append('li',{ id : 'iTu' ,innerText : 'Tu'})
            .append('li',{ id : 'iWe' ,innerText : 'We'})
                .append('li',{ id : 'iTh' ,innerText : 'Th'})
                    .append('li',{ id : 'iFr' ,innerText : 'Fr'})
                        .append('li',{ id : 'iSa' ,innerText : 'Sa'});
    currentYear.getCurrentMonth().days.forEach((element)=>{
        if( element.number == 1 && element.dayNumber != 0 )
        {
            var oter = '';
            for( var  o = 0;  o< element.dayNumber ;o++){
                oter =  reAssign(o);
                $('#i'+oter).append( 'li', { class: 'iliDays' ,innerHTML : '&nbsp;'})  ;
            }
            $('#i'+element.dayNumberStr).append( 'li', { class:  ( element.isCurrent==true? 'iliDays current' : 'iliDays'),id : element.number , innerText : element.number })
        }       
        else{$('#i'+element.dayNumberStr).append( 'li', { class:  ( element.isCurrent==true? 'iliDays current' : 'iliDays'),id : element.number , innerText : element.number })}
    }); 
    $('.iliDays').setEventHandler({onclick : (event) => onInputDayClick(event) } );  
}

var initToInput = (input) => {
    //Header init
    $(input).append('div',{id:'calendarModal'})
    console.log(  $('#calendarModal').currEl);
    $('#calendarModal').append('div',{id:'inputModalMainHolder'})

    $('#inputModalMainHolder').append('ul', {class : 'inputMonth'});

    $('.inputMonth').append('ul',{id: 'inputIdMonth'});    
    $('#inputIdMonth')
        .append('li',{class:'inputPrev',innerHTML:'&#10094;'})
        .append('li',{class:'inputNext',innerHTML:'&#10095;'})
        .append('li',{id:'inputYearHolder'});
    
    $('#inputYearHolder').append('span', { id :'inputYearSpan'} );
    $('#inputYearSpan').modify({ 'innerHTML' : currentMonth.name+ '<br><span style="font-size:18px"> <i id="decrYInput" >&#6132;</i> '+currentYear.number+'<i id="incrYInput">&#6129;</i></span>'    }) 

    $('#incrYInput').setEventHandler({onclick: () =>  onInputIncrYearClick() });
    $('#decrYInput').setEventHandler({onclick: () =>  onInputDecsYearClick() });    

    $('.inputPrev').setEventHandler({onclick : () => {
            try{
            currentMonth.isCurrent = false; 
            currentYear.months[currentMonth.number-2 ].isCurrent = true;
            currentMonth =  currentYear.getCurrentMonth();
            reInitToInput(input); 
        } 
            catch(exc){
                currentYear = new Year(--currentYear.number) ;   
                currentYear.getCurrentMonth().isCurrent  = false   
                currentMonth.isCurrent = false; 
                currentYear.months[11].isCurrent = true;
                currentMonth =   currentYear.getCurrentMonth();
                reInitToInput(input);  

            }
    }});
    $('.inputNext').setEventHandler({onclick : () => {
           try{ 
                currentMonth.isCurrent = false; 
                currentYear.months[currentMonth.number ].isCurrent = true;
                currentMonth =  currentYear.getCurrentMonth();
                reInitToInput(input);
            }
            catch(exc){
                currentYear = new Year(++currentYear.number) ;      
                currentMonth.isCurrent = false; 
                currentYear.months[0].isCurrent = true;
                currentMonth =  currentYear.getCurrentMonth();
                reInitToInput(input);
            }
    }});

    $(input).append('ul',{class:'inputWeekdays'});   
    $('.inputWeekdays')  .append('li',{ id : 'iSu' ,innerText : 'Su'})
                            .append('li',{ id : 'iMo' ,innerText : 'Mo'})
                                .append('li',{ id : 'iTu' ,innerText : 'Tu'})
                                    .append('li',{ id : 'iWe' ,innerText : 'We'})
                                        .append('li',{ id : 'iTh' ,innerText : 'Th'})
                                            .append('li',{ id : 'iFr' ,innerText : 'Fr'})
                                                .append('li',{ id : 'iSa' ,innerText : 'Sa'});

    currentYear.getCurrentMonth().days.forEach((element)=>{
        if( element.number == 1 && element.dayNumber != 0 )
        {
            var oter = '';
            for( var  o = 0;  o< element.dayNumber ;o++){
                oter =  reAssign(o);
                $('#i'+oter).append( 'li', { class: 'iliDays' ,innerHTML : '&nbsp;'})  ;
            }
            $('#i'+element.dayNumberStr).append( 'li', { class:  ( element.isCurrent==true? 'iliDays current' : 'iliDays'),id : element.number , innerText : element.number })
        }       
        else{$('#i'+element.dayNumberStr).append( 'li', { class:  ( element.isCurrent==true? 'iliDays current' : 'iliDays'),id : element.number , innerText : element.number })}
    }); 
    $('.iliDays').setEventHandler({onclick : (event) => onInputDayClick(event) } );  
   //end
}