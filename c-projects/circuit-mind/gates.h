// Contains Gate Module and Definitions for Circuit Mind Game
// Author : Mehedi Gazi

// Inc Libraries
#ifndef GATES_H
#define GATES_H

// Constants (Max limitation for gates)
#define MAX_GATES 10

// Define Protypes and Structs
typedef enum {
    AND,
    OR,
    XOR,
    NOT,
    NONE
} GateType;

typedef struct {
    GateType type;
    int input1;
    int input2;
} Gate;


// Multiple Gates and Circuit Structure for the advanced circuit mind game
// Circuit Structure to hold multiple gates and their connections

typedef struct {
    Gate gates[MAX_GATES];       // Array of gates in the circuit
    int connections[MAX_GATES][2]; // Connections for each gate's inputs
                                  // connections[i][0] = index of gate that feeds input1 of gate i, -1 if external input
                                  // connections[i][1] = index of gate that feeds input2 of gate i, -1 if external input
    int num_gates;
} Circuit;


// Function declarations
int evaluate_gate(Gate gate);
void print_gate_result(Gate gate);
GateType get_gate_type_from_input(char input);
void display_menu(void);
int evaluate_circuit_gate(Circuit *circuit, int gate_index, int *cache);
int evaluate_circuit(Circuit *circuit, int final_gate_index);

#endif