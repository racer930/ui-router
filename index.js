/**
 * Created by user on 1/28/17.
 */

router.init('div[ui-view="main"]').then(function(){
    console.log('Temlate is loaded');
}).catch(function(error){
    console.log('Template was not loaded');
});



