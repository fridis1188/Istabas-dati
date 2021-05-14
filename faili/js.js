// anychart.onDocumentReady(function() {
    
//     var data = {
//         header: ["Name", "Death toll"],
//         rows: [
//           ["San-Francisco (1906)", 1500],
//           ["Messina (1908)", 87000],
//           ["Ashgabat (1948)", 175000],
//           ["Chile (1960)", 10000],
//           ["Tian Shan (1976)", 242000],
//           ["Armenia (1988)", 25000],
//           ["Iran (1990)", 50000]
//       ]};
//           // create the chart
//           var chart = anychart.column();
    
//           // add the data
//           chart.data(data);
      
//           // set the chart title
//           chart.title("The deadliest earthquakes in the XXth century");
      
//           // draw
//           chart.container("chart");
//           chart.draw();
//         });

//Mēģināju ielikt diagrammu uz lapas, bet kaut kas tur nesaiet.


//Atstāju jau iepriekš uzrakstītos paskaidrojumus

//tiek definēti globālie mainīgie, ļoti svarīgi ir norādīt konkrēto url
var ws;
var wsUri = "ws://40.113.128.56:1880/ws/public/mqtt";

  function wsConnect() {
    
    // parāda paziņojumu konsolē par izveidotu savienojumu
    console.log("connect",wsUri);
    
    //tiek definēts jauns WebSocket objekts, kas ir paredzēts, lai savienotos ar wsUri definēto servera adresi
    ws = new WebSocket(wsUri);
    
    //tiek definēts funkcijas lokālais mainīgais obj, kas tiks izmantots, lai apstrādātu ienākošos datus
    var obj;
    
    //websocket notikums (event) datu saņemšanai no servera
    ws.onmessage = function(msg) {
      
      //ienākošos datus sakārto JSON objektā
      var data = msg.data;

      //console.log var izmantot, lai datus attēlotu konsolē
      console.log(data);

      //html lapā div ar id=messages parāda ienākošos datus
      document.getElementById('messages').innerHTML = data;

      //json datus (no string formāta) pārveido par JavaScript objektu
      obj = JSON.parse(data);

      //if funkcija, lai attēlotu tikai nepieciešamo informāciju
      if (obj.topic == "SPV/Mehi/Fridis/test") {

        //šajā gadījumā html div elementā ar id=demo tiek attēlots topic nosaukums un informācija, ko tas parāda
        document.getElementById("demo").innerHTML = obj.topic + " ===== " + obj.payload;

      } else {
        //parādās, ja no norādītā topic nekādi dati netiek sūtīti
        document.getElementById("demo").innerHTML = "Nepareizais topics";
      };

    }

    //notikums, kas parāda, ka ir izveidojies savienojums ar serveri  
    ws.onopen = function() {
      document.getElementById('status').innerHTML = "Savienots";
      console.log("connected");
    }
    
    //notikums, kas parāda paziņojumu, ja savienojums nav izveidots
    ws.onclose = function() {
      document.getElementById('status').innerHTML = "Nav savienots";
      //ja ir pazudis savienojums, tas automātiski mēģina izveidot savienojumu katras 3 sekundes
      setTimeout(wsConnect,3000);
    }
    
  }

//TIEK IZSAUKTA wsConnect FUNKCIJA
wsConnect();

