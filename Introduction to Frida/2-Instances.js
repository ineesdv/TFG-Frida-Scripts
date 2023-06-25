Java.perform(() => {
    var UniversityClass = Java.use('com.example.University');
    var StringClass = Java.use('java.lang.String');

    var universityName = StringClass.$new('University1');
    var universityInstance = UniversityClass.$new(universityName);

    var courseName = StringClass.$new('Cybersecurity');
    universityInstance.addCourse(courseName);
});