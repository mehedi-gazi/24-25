CC = gcc
CFLAGS = -Wall -Wextra -std=c11
DEPS = gates.h
OBJ = main.o gates.o
TEST_OBJ = tests/tests.o gates.o

%.o: %.c $(DEPS)
    $(CC) -c -o $@ $< $(CFLAGS)

tests/%.o: tests/%.c $(DEPS)
    $(CC) -c -o $@ $< -I. $(CFLAGS)

all: circuit test

circuit: $(OBJ)
    $(CC) -o $@ $^ $(CFLAGS)

test: $(TEST_OBJ)
    $(CC) -o $@ $^ $(CFLAGS)

clean:
    rm -f *.o tests/*.o circuit test circuit.exe test.exe

.PHONY: clean all