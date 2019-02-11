class Month {
    constructor(name,numberOfDays){
        if( name != undefined && numberOfDays != undefined && name != null && numberOfDays != null  ){
            this.name =  name;
            this.numberOfDays =  numberOfDays;
        }
    }
}

var months =
            [ 
                new Month('January',31),new Month('February',28),new Month('March',31)
                ,new Month('April',30),new Month('May',31),new Month('June',30)
                ,new Month('July',31),new Month('August',31),new Month('September',30)
                ,new Month('October',31),new Month('November',30),new Month('December',31) 
            ];
var currentMonth = months[new Date().getMonth()];
var currentYear  = new Date().getFullYear();
var mainHolder   = $('#mainHolder');

$('#mainHolder').append('ul', {class : 'month'});

$('.month').append('ul',{id: 'idMonth'});    
$('#idMonth')
    .append('li',{class:'prev',innerHTML:'&#10094;'})
    .append('li',{class:'next',innerHTML:'&#10095;'})
    .append('li',{id:'yearHolder'});

$('.prev').setEventHandler({onclick : () => { currentMonth =  months[months.indexOf(currentMonth) - 1]; rebuildCalendar(); } })
$('.next').setEventHandler({onclick : () => { currentMonth =  months[months.indexOf(currentMonth) + 1]; rebuildCalendar(); }  })

$('#yearHolder').append('span', { id :'yearSpan'} );

$('#yearSpan').modify({ 'innerHTML' :   currentMonth.name+  '<br><span style="font-size:18px"> <i id="incrY" >&#6132;</i> '+currentYear+'<i id="decrY">&#6129;</i></span>'    }) 

$('#mainHolder').append('ul',{class:'weekdays'});

$('.weekdays').append('li',{innerText : 'Mo'})
                .append('li',{innerText : 'Tu'})
                .append('li',{innerText : 'We'})
                .append('li',{innerText : 'Th'})
                .append('li',{innerText : 'Fr'})
                .append('li',{innerText : 'Sa'})
                .append('li',{innerText : 'Su'});
$('#mainHolder').append('ul',{class: 'days'});

for( var i = 0 ; i< currentMonth.numberOfDays ; i++ ){
    $('.days').append('li',{ class: 'liDays', innerText : i+1 })   
}    

var onDayClick = (event) =>{
    $('.liDays').modify({class: 'liDays'}) ;
    if(!$(event.toElement).elementsClassListHasClass('active')){
            $(event.toElement).addClassToElementClassList('active') ;
    }
}

$('#incrY').setEventHandler({onclick: () => { currentYear++ ; rebuildCalendar();  } });
$('#decrY').setEventHandler({onclick: () => { currentYear-- ; rebuildCalendar();  } });

$('.liDays').setEventHandler({onclick : (event) => onDayClick(event) } );   



var rebuildCalendar = () => {
    $('#yearSpan').modify({ 'innerHTML' :   currentMonth.name+ '<br><span style="font-size:18px"> <i>&#6132;</i> '+currentYear+'<i>&#6129;</i></span>'   }) 
    $('.days').modify({innerHTML: ''})
    for( var i = 0 ; i< currentMonth.numberOfDays ; i++ ){
        $('.days').append('li',{ class: 'liDays', innerText : i+1 })
    }  
    $('.liDays').setEventHandler({onclick : (event) => onDayClick(event) } );   
}
