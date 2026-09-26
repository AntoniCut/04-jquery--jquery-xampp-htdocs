$(document).ready(function()
{	
	var $myButton = $('#mybutton');
	$myButton.on('click', function(){
		
		//$.get('_partial.html', showResult);
		//$.get('_partial.html').done(showResult);
		//$.get('_partialn.html').done(showResult).fail(showIsPartialError);

		//$.when($.get('_partial.html') ).done(showResult);
		/*$.when($.get('_partial.html'), $.get('_partial2.html') )
			.done(function(get1Return, get2Return) {
				var html1 = get1Return[0];
				var html2 = get2Return[0];
				showResult(html1 + html2);
		});*/
		
		/*isPair(3)
			.done(function(){ showResult('Correcto')})
			.fail(function(){ showResult('Mal!')});*/
		
		/*$.when(isPair(2), $.get('_partial.html') )
			.done(function(p, get1Return) {
				var html1 = get1Return[0];
				showResult(html1);
			})
			.fail(function() {
				showResult('Error');
			})
			.always(function(){
				$myButton.val('Llamada hecha');
			})
			.progress(function(note){
				console.info(note);
			});*/
			
		/*$.when(isPair(3), $.get('_partial.html') )
			.then(function(p, get1Return) {
				var html1 = get1Return[0];
				showResult(html1);
				}, 
				function() {
					showResult('Error');
				}, 
				function(){
					$myButton.val('Llamada hecha');
				}
			);*/
		
		//$.when(2).then(function(n) { console.info(n); });
		
		//$.when($.get('_partial.html'), $('#mybutton').animate({'font-size': '+=10'}, 5000)).done(showResult);
		//$.when($('#mybutton').animate({'height': 'toggle'}, 5000), $('#mydiv').animate({'font-size': '+=10'}, 2500)).done(function() {showResult('Hello World!');});
	});
	
	var isPair = function(x){
		var deferred = $.Deferred();
		deferred.notify('entrando'); // Funcionará
		
		if(x % 2 == 0) {	
			deferred.resolve();
		}
		else {
			deferred.reject();
		}
		
		deferred.notify('saliendo'); // No funcionará

		return deferred.promise();
	};
	
	var showResult = function(html){	
		$('#mydiv').html(html);
	}
	
	var showIsPartialError = function(html){	
		$('#mydiv').html('Error al cargar el partial');
	}
});