// Circuit Mind Project: C Project thats implemnts a circuit mind emulation.
// Using my low-level C Programming Revision to restart my knowledge in general programming, I have shown my progression by making projects like this to standarize my knowledge in the foundations of computing.
// Author: Mehedi Gazi

// Inst 1 - Include Libraries
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "gates.h"


// Puzzle structure to represent a puzzle with an expected output
typedef struct {
    Circuit circuit; // Circuit structure to hold multiple gates
    int expected_output; // Expected output for the puzzle
    int final_gate_index; // Index of the final gate in the circuit
} Puzzle;

#define SAVE_FILE "save.txt"

// Function to load the progress (level) from a save.txt
int load_progress() {
    FILE *file = fopen(SAVE_FILE, "r");
    if (file == NULL) return 0;  // If file doesn't exist, start from puzzle 0

    int level;
    fscanf(file, "%d", &level);
    fclose(file);
    return level;
}

// Function to save the current progress (level) to save.txt

void save_progress(int level) {
    FILE *file = fopen(SAVE_FILE, "w");
    if (file == NULL) {
        printf("Error saving progress.\n");
        return;
    }
    fprintf(file, "%d", level);
    fclose(file);
}


// Function to play a puzzle
int play_puzzle(Puzzle puzzle) {
    Gate gate;
    char choice;

    printf("\n--- Puzzle Prompt ---\n");
    printf("Objective -> Match the output = %d\n", puzzle.expected_output);

    while (1) {
        display_menu();
        scanf(" %c", &choice);

        if (choice == 'Q' || choice == 'q') {
            printf("Exiting the game.\n");
            return -1;  // Signal quit
        }

        gate.type = get_gate_type_from_input(choice);

        if (gate.type == NONE) {
            printf("Invalid gate type. Please try again.\n");
            continue;
        }

        printf("Enter input 1 (0 or 1): ");
        scanf("%d", &gate.input1);

        if (gate.type != NOT) {
            printf("Enter input 2 (0 or 1): ");
            scanf("%d", &gate.input2);
        } else {
            gate.input2 = 0; // Not used for NOT gate
        }

        int result = evaluate_gate(gate);
        printf("You got: %d\n", result);

        if (result == puzzle.expected_output) {
            printf("++ Correct! Puzzle solved \n");
            break;
        } else {
            printf("-- Incorrect. Please try again. \n");
        }
    }

    return 0;  // Puzzle completed normally
}


#define Max_Puzzles 100 // Max set limit of puzzles

int load_puzzles (const char *filename, Puzzle puzzles[], int max_puzzles) {
    FILE *file = fopen(filename, "r");
    if (!file) {
        printf("Error opening file: %s\n", filename);
        return 0; // Return 0 if file cant be opened
    }

    int count = 0;
    while (count < max_puzzles && fscanf(file, "%d", &puzzles[count].expected_output) == 1) {
        count++;
    }

    fclose(file);
    return count; // Returns the no. of puzzles loaded.
}

int main() {
    Puzzle puzzles[Max_Puzzles];
    int total_puzzles = load_puzzles("puzzles.txt", puzzles, Max_Puzzles);

    if (total_puzzles == 0) {
        printf("No puzzles loaded. Exiting.\n");
        return 1;
    }
    printf("Loaded %d puzzles.\n", total_puzzles);

    int start_level = load_progress();

    // Reset prompt goes here:
    printf("\n=== Circuit-Mind ===\n");
    printf("You have %d puzzles loaded.\n", total_puzzles);
    printf("Progress: Puzzle %d\n", start_level + 1);
    printf("Do you want to reset your progress? [Y/N]: ");

    char reset_choice;
    scanf(" %c", &reset_choice);

    if (reset_choice == 'Y' || reset_choice == 'y') {
        save_progress(0);
        start_level = 0;
        printf("Progress has been reset. Starting from Puzzle 1.\n");
    }

    for (int i = start_level; i < total_puzzles; i++) {
        printf("\n=== Puzzle %d ===\n", i + 1);
        int status = play_puzzle(puzzles[i]);
        if (status == -1) {
            printf("Game exited early.\n");
            break;
        }
        save_progress(i + 1);
    }


    printf("All puzzles completed. Thanks for playing!\n");
    return 0;
}
