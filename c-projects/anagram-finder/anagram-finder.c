// Project VI - Anagram Finder - Arrays and Strings, Manipulation etc.
// Inc. Libraries - EX1
#include <stdio.h>
#include <string.h>

int main() {
    // EX2 Intitalized Arrays - Counters 4 0's
    int counter1[] = {0, 0, 0, 0};
    int counter2[] = {0, 0, 0, 0};

    // EX7 Int Var - flag
    int flag = 0;

    // EX3 Char Arrays
    char s1[] = "dbb cccccaacb cdbababdcdcdab dcdad";
    char s2[] = "bbbcc bdddccccad cdbbaaacaccdabdd";
    
    // Ex4 - For Loop with strlen
    for (int i = 0; i < strlen(s1); i++) {
        // Ex5 - Logic for String 1
        if (s1[i] == 'a') {
            counter1[0]++;
        } else if (s1[i] == 'b') {
            counter1[1]++;
        } else if (s1[i] == 'c') {
            counter1[2]++;
        } else if (s1[i] == 'd') {
            counter1[3]++;
        } else {
            continue;
        }
    }

    // Ex6 - Same For Loop and Logic for String 2
    for (int i = 0 ; i < strlen(s2); i++) {
        if (s2[i] == 'a') {
            counter2[0]++;
        } else if (s2[i] == 'b') {
            counter2[1]++;
        } else if (s2[i] == 'c') {
            counter2[2]++;
        } else if (s2[i] == 'd') {
            counter2[3]++;
        } else {
            continue;
        }
    }

    // Ex 8 - For Loop for both counters
    for (int i = 0; i < 4; i++) {
        if (counter1[i] != counter2[i]) {
            flag = 1;
        } else {
            break;
        }
    }

    // EX 10 - PrintF Check
    if (flag == 1) {
        printf("Anagram match!");
    } else {
        printf("Not an anagram match!");
    }

    return 0;
}