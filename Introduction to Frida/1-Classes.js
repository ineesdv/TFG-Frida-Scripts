Java.perform(() => {
    var UniversityClass = Java.use('com.example.University');
    UniversityClass.listCourses();
    var name = UniversityClass.universityName.value;
    console.log(`University name: ${name}`);
  });  