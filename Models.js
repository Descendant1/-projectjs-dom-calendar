class Year {
    constructor(number){
        this.number =  number;
        this.months =  [ 
                            new Month(1,'January',31, number    )   ,new Month(2,'February', 28, number    )   ,new Month(3,'March',31  , number     )
                            ,new Month(4,'April',30  , number   )   ,new Month(5,'May',31    , number       )   ,new Month(6,'June',30  , number      )
                            ,new Month(7,'July',31   , number   )   ,new Month(8,'August',31    , number    )   ,new Month(9,'September',30 , number  )
                            ,new Month(10,'October',31 , number )   ,new Month(11,'November',30   , number  )   ,new Month(12,'December',31  , number ) 
                        ];
    }
    getHTMLTitle(){
        return this.getCurrentMonth().name+ '<br><span style="font-size:18px"> <i id="decrY" >&#6132;</i> '+this.number+'<i id="incrY">&#6129;</i></span>' 
    }
    getCurrentMonth(){
        return this.months.filter(i=>i.isCurrent == true)[0];
    }
}
class Month {
    constructor(num, name,numberOfDays, year){
            this.name =  name;
            this.number = num;
            this.days =  [];
            this.isCurrent =  num - 1  == new Date().getMonth();
            for(var i =  1 ; i <= numberOfDays ; i++){
                this.days.push(new Day(i, num,year));
            }
    }
    getDayById(id){
        return this.days.filter(i=>i.id ==  id);
    }
}
class Day {
    constructor(number, mon, year){
        this.id =  
        this.number = number;
        this.dayNumber =  new Date(mon + '-'+  number  +'-'+ year).getDay();
        this.UTCDate = new Date(mon + '-'+  number  +'-'+ year);
        switch(this.dayNumber) {
            case 1:
                this.dayNumberStr = 'Mo'
                break;
            case 2:
                this.dayNumberStr = 'Tu'      
                break;
            case 3:
                this.dayNumberStr = 'We'   
                break;
            case 4:
                this.dayNumberStr =  'Th'    
                break;
            case 5:
                this.dayNumberStr =  'Fr' 
                break;
            case 6:
                this.dayNumberStr =  'Sa'
                break;
            case 0:
                this.dayNumberStr =  'Su'
                break;
        }
        this.isCurrent = ( this.number ==  new Date().getDate() && mon -1 == new Date().getMonth() && year == new Date().getFullYear()); 
                                
        this.Events =  []
    }

}
class Event {
    constructor(id,name, date, desc){
        this.id   =    id;
        this.name =  name;
        this.date =  date;
        this.desc =  desc;
    }
}
