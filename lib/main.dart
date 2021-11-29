import 'package:flutter/material.dart';
import 'api.dart';
//import 'server.dart';
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
 
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'School Assignment',
      theme: ThemeData(
        
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Courses Home Page'),
      
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);
    final CourseApi api = CourseApi();


  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

List courses = [];
bool _dbLoaded = false;

  void initState() {
    super.initState();

    widget.api.getAllCourses().then((data) {
      setState(() {
        courses = data;
        _dbLoaded = true;
      });
    });
  }
  @override
  Widget build(BuildContext context) {
 
    return Scaffold(
      appBar: AppBar(
      
        title: Text(widget.title),
      ),
      body: Center(
  
        child: Column(
         
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            //adding temporarily below
          TextButton(
            onPressed:() => (
              print(courses)
          ),
           child: Text("Press Me!"))
           
          ],
        ),
      ),
    );
  }
}
