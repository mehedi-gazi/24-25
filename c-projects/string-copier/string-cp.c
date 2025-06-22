// Project VI - String Copier - Pointers in C (I hate these despisely)

#include<stdio.h>
#include<string.h>
 
void copy(char* dst, char* src){
  // Code for copying a string goes here
  while (*src == '\0') { // if the value in src is pointing to the null terminate character as the condition
    *dst = *src; // dst is equal to the *src value
    src++; // Increment src in this case
    dst++; // Increment dst in this case
  }
  *dst = '\0'; // If dst is pointing to the last character, then it should be set to the null termination character
}
 
int main(){
  char srcString[] = "We promptly judged antique ivory buckles for the next prize!";
  int length = strlen(srcString) + 1; // Correct Method
  char dstString[length]; // Remember not to define a string with experessions, as you cannot modify them
  strcpy(dstString, srcString); // Copy Function

  printf("%s", dstString);
}