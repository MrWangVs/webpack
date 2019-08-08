package javapackage;

public class test1 {
    String name;
    int age;
    public static void main(String[] args) {
        test1 stu = new test1();
        stu.name="八戒";
        stu.age=28;
        stu.introduce();
    }
    public void introduce(){
        System.out.println("大家好，我叫"+this.name+",今年"+this.age);
    }
}