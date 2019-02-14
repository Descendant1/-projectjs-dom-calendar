

init('Month');

var inpSel ='input[type=calendar]';

initToInput($('#Some').currEl);

$(inpSel).setEventHandler({onfocus: ()=> {$(inpSel).modify({value: ''}); $('#Some').modifyStyles({display:'block'});}  });

