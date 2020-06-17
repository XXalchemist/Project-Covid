$(document).ready(function(){


    
   
    // Json data
    $.getJSON("https://pomber.github.io/covid19/timeseries.json", function(data){
        var country_name;
        var confirmed = [];
        var recovered = [];
        var deceased = [];
        var dates = [];

    
        var total_confirmed;
        var total_recovered;
        var total_deceased;
        
        // On button CLick
        $.fn.getInput = function(){ 
            console.log('clicked');
            country_name = $("#myInput").val();
            console.log(country_name);
            country_name = country_name[0].toUpperCase() + country_name.slice(1);
            console.log(country_name);
            let country_Data = data [country_name];
        

        console.log(data)
        
        
        let information = country_Data[country_Data.length-1];

        console.log(information);

        console.log(information['deaths'])
    
       total_confirmed = information['confirmed'];
       total_deceased = information['deaths'];
       total_recovered = information['recovered'];
    
       //pass data to index.html
       $("#confirmed").text(total_confirmed);
       $("#deceased").text(total_deceased);
       $("#recovered").text(total_recovered);


       $.each(country_Data, function(id, obj){
       
        confirmed.push(obj.confirmed);
        recovered.push(obj.recovered);
        deceased.push(obj.deaths);
        dates.push(obj.date);
        
                

    });
    console.log(country_Data);
    console.log(confirmed.length);
    console.log(recovered.length);
    console.log(deceased.length);

    dates = dates.slice(Math.max(dates.length - 30, 0));


    //Chart
    const myChart = document.querySelector('#myChart').getContext('2d');

    const chart = new Chart(myChart, {
        type: "bar",
        data:{
            labels: dates ,
            datasets:[
                {
                    label:"Confirmed",
                    //confirmed array
                    data : confirmed.slice(Math.max(confirmed.length - 30, 0)),
                    backgroundColor : "#f1c40f",
                },
                {
                    label : "Recovered",
                    data  : recovered.slice(Math.max(recovered.length - 30, 0)),
                    backgroundColor : 'green',
                },
                {
                    label : "Deaths/Deceased",
                    data : deceased.slice(Math.max(deceased.length - 30, 0)),
                    backgroundColor : 'red',
                },

            ]
        },
        options: {

        },

    });

            
        }
        $("#myBtn").click(function(){
            $.fn.getInput();
        });
    

        console.log(data)
        
    //     let getInput = function ()  {
    //          country_name = document.getElementById("my_input");
    //          country_name = country_name[0].toUpperCase() + country_name.slice(1);
    //          console.log(country_name);
    
    //     };
       
        

        
    });

});