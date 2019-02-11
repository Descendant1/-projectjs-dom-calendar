var mainHolder   = $('#mainHolder');

var currentYear  = new Year(new Date().getFullYear());
var currentMonth =  currentYear.getCurrentMonth();



var  leapYear = (year) => { return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)};

var  isToday = (day) => { return  day ==  new Date().getDate() &&  currentYear  == new Date().getFullYear() &&  months.indexOf(currentMonth) == new Date().getMonth();}

var reAssign = (o) =>{
    switch(o) {
        case 1:
                oter = 'Mo';
            break;
        case 2:
                oter = 'Tu';    
            break;
        case 3:
                oter = 'We';   
            break;
        case 4:
                oter =  'Th';    
            break;
        case 5:
                oter =  'Fr'; 
            break;
        case 6:
                oter =  'Sa';
            break;
        case 0:
                 oter =  'Su';
            break;
      }
      return oter;
}


$('#close').setEventHandler({onclick: () =>{ $('#myModal').modifyStyles({display:'none'}) }});

var openModal = (day) => {
    day = currentMonth.getDayById(day.id)[0]
    $('#dayTime').modify({ innerText : 'Events for '+ day.number +'  '+ currentMonth.name })
    day.Events.push( new Event('Some Name', new Date() ,'Some shit will happen') );
    day.Events.map(i=> {
        $('#events').append('p', { innerHTML : i.name + '<br>' + i.desc  } )
    })

    $('#myModal').modifyStyles({display:'block'});

}


var onDayClick = (event) =>{
        $('.liDays').modify({class: 'liDays'}) ;
        if(!$(event.toElement).elementsClassListHasClass('active')){
                $(event.toElement).addClassToElementClassList('active') ;
        }
        openModal(event.toElement);

}
var onIncrYearClick = (  ) => { 
    currentYear++ ; 
    if(currentMonth.name === 'February'  ){
        months[months.indexOf(currentMonth)].numberOfDays = leapYear(currentYear) ? 29: 28;      
    }
    reInitCalendar();  
};
var onDecsYearClick = (  ) =>{
    currentYear-- ; 
    if(currentMonth.name === 'February'  ){
         months[months.indexOf(currentMonth)].numberOfDays = leapYear(currentYear) ? 29: 28;
    }
    reInitCalendar();  
}




var init = () => {
    $('#mainHolder').append('ul', {class : 'month'});
    
    $('.month').append('ul',{id: 'idMonth'});    
    $('#idMonth')
        .append('li',{class:'prev',innerHTML:'&#10094;'})
        .append('li',{class:'next',innerHTML:'&#10095;'})
        .append('li',{id:'yearHolder'});
    
    $('#yearHolder').append('span', { id :'yearSpan'} );
    $('#yearSpan').modify({ 'innerHTML' : currentYear.getHTMLTitle()   }) 


  //  $('.prev').setEventHandler({onclick : () => { currentMonth =  months[months.indexOf(currentMonth) - 1]; reInitCalendar(); } })
   // $('.next').setEventHandler({onclick : () => { currentMonth =  months[months.indexOf(currentMonth) + 1]; reInitCalendar(); }  })

    $('#mainHolder').append('ul',{class:'weekdays'});

    $('.weekdays')  .append('li',{ id : 'Su' ,innerText : 'Su'})
                    .append('li',{ id : 'Mo' ,innerText : 'Mo'})
                    .append('li',{ id : 'Tu' ,innerText : 'Tu'})
                    .append('li',{ id : 'We' ,innerText : 'We'})
                    .append('li',{ id : 'Th' ,innerText : 'Th'})
                    .append('li',{ id : 'Fr' ,innerText : 'Fr'})
                    .append('li',{ id : 'Sa' ,innerText : 'Sa'});

    $('#mainHolder').append('ul',{class: 'days'});

    currentYear.getCurrentMonth().days.forEach((element)=>{
        if( element.number == 1 && element.dayNumber != 0 )
        {
            var oter = '';
            for( var  o = 0;  o< element.dayNumber ;o++){
                oter =  reAssign(o);
                $('#'+oter).append( 'li', { class: 'liDays' ,innerHTML : '&nbsp;'})  ;
            }
        }       
        $('#'+element.dayNumberStr).append( 'li', { class: 'liDays' ,id : element.number , innerText : element.number })
    }); 

    $('.liDays').setEventHandler({onclick : (event) => onDayClick(event) } );   
}
/////////
init();

////////

$('#incrY').setEventHandler({onclick: () =>  onIncrYearClick() });

$('#decrY').setEventHandler({onclick: () =>  onDecsYearClick() });

$('.liDays').setEventHandler({onclick : (event) => onDayClick(event) } );   

var reInitCalendar = () => {
    $('#yearSpan').modify({ 'innerHTML' :   currentMonth.name +  '<br><span style="font-size:18px"> <i id="decrY" >&#6132;</i> '+currentYear+'<i id="incrY">&#6129;</i></span>'    }) 
    $('#incrY').setEventHandler({onclick: () =>  onIncrYearClick() });
    $('#decrY').setEventHandler({onclick: () =>  onDecsYearClick() });

    $('.days').modify({innerHTML: ''})
    for( var i = 0 ; i< currentMonth.numberOfDays ; i++ ){
        $('.days').append('li',{ class:  isToday(i+1) ? 'liDays current' : 'liDays', innerText : i+1 })
    }  
    $('.liDays').setEventHandler({onclick : (event) => onDayClick(event) } );   
}



