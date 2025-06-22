// Gates C File for functions and link to main.c
// Author: Mehedi Gazi

#include <stdio.h>
#include <string.h>
#include "gates.h"

// Basic gate logic
int evaluate_gate(Gate gate) {
    switch (gate.type) {
        case AND: return gate.input1 && gate.input2;
        case OR:  return gate.input1 || gate.input2;
        case XOR: return gate.input1 ^ gate.input2;
        case NOT: return !gate.input1;
        default:  return -1;
    }
}

void print_gate_result(Gate gate) {
    int output = evaluate_gate(gate);
    printf("Result: %d\n", output);
}

// Menu UI + Gate Input Handling
GateType get_gate_type_from_input(char input) {
    switch (input) {
        case 'A': return AND;
        case 'O': return OR;
        case 'X': return XOR;
        case 'N': return NOT;
        default:  return NONE;
    }
}

void display_menu() {
    printf("\nCircuit Mind Game:\n");
    printf("[A] AND gate\n");
    printf("[O] OR gate\n");
    printf("[X] XOR gate\n");
    printf("[N] NOT gate\n");
    printf("[P] Load puzzle\n");
    printf("[S] Save circuit\n");
    printf("[Q] Quit\n");
    printf("Enter your choice: ");
}

// Recursive circuit evaluation
int evaluate_circuit_gate(Circuit *circuit, int gate_index, int *cache) {
    if (cache[gate_index] != -1) {
        return cache[gate_index];  // already evaluated
    }

    Gate gate = circuit->gates[gate_index];
    int input1, input2;

    // Get input1
    if (circuit->connections[gate_index][0] == -1) {
        input1 = gate.input1;
    } else {
        input1 = evaluate_circuit_gate(circuit, circuit->connections[gate_index][0], cache);
    }

    // Get input2 (if not NOT gate)
    if (gate.type == NOT) {
        input2 = 0;
    } else if (circuit->connections[gate_index][1] == -1) {
        input2 = gate.input2;
    } else {
        input2 = evaluate_circuit_gate(circuit, circuit->connections[gate_index][1], cache);
    }

    Gate eval_gate = { gate.type, input1, input2 };
    int result = evaluate_gate(eval_gate);
    cache[gate_index] = result;

    return result;
}

// Evaluation of the full circuit
int evaluate_circuit(Circuit *circuit, int final_gate_index) {
    int cache[MAX_GATES];
    for (int i = 0; i < MAX_GATES; i++) cache[i] = -1;
    return evaluate_circuit_gate(circuit, final_gate_index, cache);
}

// Load a puzzle from a file
Circuit load_puzzle(const char* filename) {
    Circuit circuit = {0};
    circuit.num_gates = 0;
    
    FILE* file = fopen(filename, "r");
    if (!file) {
        printf("Error opening puzzle file\n");
        return circuit;
    }
    
    fscanf(file, "%d", &circuit.num_gates);
    
    // Read each gate and its connections
    for (int i = 0; i < circuit.num_gates; i++) {
        int type, in1, in2, conn1, conn2;
        fscanf(file, "%d %d %d %d %d", &type, &in1, &in2, &conn1, &conn2);
        
        circuit.gates[i].type = type;
        circuit.gates[i].input1 = in1;
        circuit.gates[i].input2 = in2;
        circuit.connections[i][0] = conn1;
        circuit.connections[i][1] = conn2;
    }
    
    fclose(file);
    return circuit;
}

// Save a circuit to a file
void save_circuit(Circuit* circuit, const char* filename) {
    FILE* file = fopen(filename, "w");
    if (!file) {
        printf("Error opening save file\n");
        return;
    }
    
    fprintf(file, "%d\n", circuit->num_gates);
    
    for (int i = 0; i < circuit->num_gates; i++) {
        fprintf(file, "%d %d %d %d %d\n", 
                circuit->gates[i].type, 
                circuit->gates[i].input1, 
                circuit->gates[i].input2,
                circuit->connections[i][0],
                circuit->connections[i][1]);
    }
    
    fclose(file);
}

// Input validation for binary values
int get_valid_bit() {
    int input;
    while (1) {
        if (scanf("%d", &input) != 1 || (input != 0 && input != 1)) {
            printf("Invalid input. Please enter 0 or 1: ");
            while (getchar() != '\n'); // Clear input buffer
        } else {
            return input;
        }
    }
}

// Load basic puzzles from file
int load_puzzles(const char* filename, Puzzle puzzles[], int max_puzzles) {
    FILE* file = fopen(filename, "r");
    if (!file) {
        printf("Error opening puzzle file: %s\n", filename);
        return 0;
    }
    
    int count = 0;
    while (count < max_puzzles && !feof(file)) {
        int type, in1, in2, expected;
        if (fscanf(file, "%d", &type) != 1) break;
        if (fscanf(file, "%d", &in1) != 1) break;
        if (fscanf(file, "%d", &in2) != 1) break;
        if (fscanf(file, "%d", &expected) != 1) break;
        
        puzzles[count].gate_type = type;
        puzzles[count].input1 = in1;
        puzzles[count].input2 = in2;
        puzzles[count].expected_result = expected;
        count++;
    }
    
    fclose(file);
    return count;
}

// Load player progress from save file
int load_progress() {
    FILE* file = fopen("save.txt", "r");
    if (!file) {
        return 0; // Default to level 0 if save file doesn't exist
    }
    
    int level;
    if (fscanf(file, "%d", &level) != 1) {
        level = 0;
    }
    
    fclose(file);
    return level;
}

// Save player progress
void save_progress(int level) {
    FILE* file = fopen("save.txt", "w");
    if (!file) {
        printf("Error saving progress\n");
        return;
    }
    
    fprintf(file, "%d", level);
    fclose(file);
}

// Play a single basic puzzle
int play_puzzle(Puzzle puzzle) {
    printf("Gate type: ");
    switch (puzzle.gate_type) {
        case AND: printf("AND\n"); break;
        case OR:  printf("OR\n");  break;
        case XOR: printf("XOR\n"); break;
        case NOT: printf("NOT\n"); break;
        default:  printf("Unknown\n"); break;
    }
    
    printf("Input 1: %d\n", puzzle.input1);
    if (puzzle.gate_type != NOT) {
        printf("Input 2: %d\n", puzzle.input2);
    }
    
    printf("Calculate the output (0 or 1). Enter -1 to exit: ");
    int answer;
    scanf("%d", &answer);
    
    if (answer == -1) {
        return -1; // Exit signal
    }
    
    Gate gate = { puzzle.gate_type, puzzle.input1, puzzle.input2 };
    int correct = evaluate_gate(gate);
    
    if (answer == correct) {
        printf("Correct! The answer is %d.\n", correct);
        return 1; // Solved
    } else {
        printf("Incorrect. The correct answer is %d.\n", correct);
        return 0; // Failed
    }
}

// Load advanced circuit puzzle
int load_advanced_puzzle(const char* filename, CircuitPuzzle* puzzle) {
    Circuit circuit = load_puzzle(filename);
    if (circuit.num_gates == 0) {
        return 0;
    }
    
    // The last two lines in the file contain the input count and expected output
    FILE* file = fopen(filename, "r");
    if (!file) {
        return 0;
    }
    
    // Skip the circuit data
    int num_gates;
    fscanf(file, "%d", &num_gates);
    for (int i = 0; i < num_gates; i++) {
        int temp1, temp2, temp3, temp4, temp5;
        fscanf(file, "%d %d %d %d %d", &temp1, &temp2, &temp3, &temp4, &temp5);
    }
    
    // Read the input count and expected output
    fscanf(file, "%d", &puzzle->input_count);
    fscanf(file, "%d", &puzzle->expected_output);
    fclose(file);
    
    puzzle->circuit = circuit;
    return 1;
}

// Play an advanced circuit puzzle
void play_circuit_puzzle(CircuitPuzzle puzzle) {
    printf("\n=== Advanced Circuit Puzzle ===\n");
    printf("Input count: %d\n", puzzle.input_count);
    printf("Expected output: %d\n", puzzle.expected_output);
    
    // Let the user calculate and enter their answer
    printf("Calculate the final output (0 or 1): ");
    int answer;
    scanf("%d", &answer);
    
    // Evaluate the actual output
    int actual = evaluate_circuit(&puzzle.circuit, puzzle.circuit.num_gates - 1);
    
    if (answer == actual) {
        printf("Correct! The circuit output is %d.\n", actual);
    } else {
        printf("Incorrect. The circuit output is %d.\n", actual);
    }
}