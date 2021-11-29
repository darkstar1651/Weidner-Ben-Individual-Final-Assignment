import 'package:dio/dio.dart';
import './Models/courses.dart';
//import 'server.dart';

const String localhost = " http://localhost:1200/ ";


class CourseApi {
  final _dio = Dio(BaseOptions(baseUrl: localhost));

  Future<List> getAllCourses() async {
    final response = await _dio.get('/getAllCourses');

    return response.data['courses'];
  }

  /*Future editCoin(String id, double price) async {
    final response =
        await _dio.post('/editCoin', data: {'id': id, 'price': price});
  }

  Future deleteCoin(String id) async {
    final response = await _dio.post('/deleteCoin', data: {'id': id});
  }*/
}