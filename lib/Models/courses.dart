class Course {
  final String courseInstructor;
  final String courseCredits;
  final String courseName;

  Course._(this.courseName, this.courseInstructor, this.courseCredits);

  factory Course.fromJson(Map json) {
    //final id = json[''].replaceAll('ObjectId(\"', '').replaceAll('\")', '');
    final courseName = json['courseName'];
    final courseInstructor = json['courseInstructor'];
    final courseCredits = json['courseCredits'];

    return Course._(courseName, courseInstructor, courseCredits);
  }
}