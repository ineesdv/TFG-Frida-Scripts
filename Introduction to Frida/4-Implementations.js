Java.perform(() => {

    const MainActivityClass = Java.use('com.example.MainActivity');
    MainActivityClass.onCreate.implementation = function () {
        console.log('[+] Funcion onResume() is called');
        this.onCreate(); // "this" is a reference to the original object
    };


    const TeacherClass = Java.use('com.example.Teacher');
    TeacherClass.setStudentGrades.implementation = function (studentId, grade) {
        console.log(`Student ID: ${studentId}`);
        console.log(`Original grade: ${grade}`);
        return this.setStudentGrades(studentId, 10);
    };


    const SubjectClass = Java.use('com.example.Subject');

    // new Subject('java.lang.String')
    // new Subject('java.lang.String', 'int')
    SubjectClass.$init.overload('java.lang.String', 'int').implementation = function (param1, param2) {
        // ...
        this.$init(param1, param2);
    };

});