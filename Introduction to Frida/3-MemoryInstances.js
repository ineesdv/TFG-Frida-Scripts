Java.perform(() => {
    var StringClass = Java.use('java.lang.String');
    Java.choose('com.example.Student', {
        onMatch: function(instance) {
            instance.grade.value = 10;
            instance.registerSubject(StringClass.$new("Malware analysis"));
        },
        onComplete: function() {
            // ...
        }
    })


    var studentsArray = new Array(50);
    Java.choose('com.example.Student', {
        onMatch: function(instance) {
            studentsArray.push(instance);
        },
        onComplete: function() {
            
        }
    })
    
    for (var i = 0; j < studentsArray.length; i++){
        if (array[i] != null){
            // Use the instances
        }
    } 

});