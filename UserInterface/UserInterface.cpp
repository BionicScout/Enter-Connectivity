#include <fstream>
#include <iostream>
#include <string>
using namespace std;

class Contact{
public:

    string name;
    string  birthday;
   
    int phoneNumber;
    string email;

    void load(){

    }

    void save(){
        fstream file;
        file.open(name + ".txt", ios::out);

        file << "Test" << endl;

        file.close();
    }
};

int main(int argc, char const *argv[]) {
    Contact info;
    info.name = "Roman";
    info.save();
    



    return 0;
}
