#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main()
{
	string line;
	char c;
	int count = 1;
	ifstream myfile ("myfile.txt");

	while (getline(myfile, line))
	{
		cout << line << endl;
		if (count == 10)
		{
			cout << "read next 10 lines (y/n): ";
			cin >> c;
			if (c == 'y')
			{
				count = 0;
				cout << endl;
			}
			else
				break;
		}
		count++;
	}
	return 0;
}
