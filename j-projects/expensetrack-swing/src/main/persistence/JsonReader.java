package persistence;

import model.Ledger;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

// This class is modeled on JsonReader class from :
// https://github.students.cs.ubc.ca/CPSC210/JsonSerializationDemo

// Represents a reader that reads ledger from JSON data stored in file
public class JsonReader {
    String source;
    Ledger ledger;

    // EFFECTS: constructs a Json reader object with source of the json file
    public JsonReader(String source) {
        this.source = source;
    }

    // EFFECTS: reads ledger from file and returns it
    public Ledger read() throws IOException {
        String jsonData = readFile(source);
        JSONObject jsonObject = new JSONObject(jsonData);
        return parseLedger(jsonObject);
    }

    // EFFECTS: reads source file as string and returns it
    public String readFile(String source) throws IOException {
        StringBuilder builder = new StringBuilder();

        try (Stream<String> stream = Files.lines(Paths.get(source), StandardCharsets.UTF_8)) {
            stream.forEach(s -> builder.append(s));
        }

        return builder.toString();
    }

    /*
     * EFFECTS: parses balance to create a ledger
     *      do not need to parse balance from json, addItem calls in parseData increments the balance
     */
    private Ledger parseLedger(JSONObject jsonObject) {
        ledger = new Ledger();
        parseData(ledger, jsonObject);
        return ledger;
    }

    // MODIFIES: ledger
    // EFFECTS: parses lists from JSON object and adds them to ledger
    private void parseData(Ledger ledger, JSONObject jsonObject) {
        JSONArray data = jsonObject.getJSONArray("data");

        JSONObject incomesData = (JSONObject) data.get(0);
        JSONArray incomes = incomesData.getJSONArray("incomes");

        JSONObject expensesData = (JSONObject) data.get(1);
        JSONArray expenses = expensesData.getJSONArray("expenses");

        JSONObject goalsData = (JSONObject) data.get(2);
        JSONArray goals = goalsData.getJSONArray("goals");

        // for adding all the objects back to their lists
        for (Object income : incomes) {
            JSONObject nextIncome = (JSONObject) income;
            addIncomeItem(ledger, nextIncome);
        }
        for (Object expense : expenses) {
            JSONObject nextExpense = (JSONObject) expense;
            addExpenseItem(ledger, nextExpense);
        }
        for (Object goal : goals) {
            JSONObject nextGoal = (JSONObject) goal;
            addGoalItem(ledger, nextGoal);
        }
    }

    // MODIFIES: ledger
    // EFFECTS: parses income object from JSON object and adds it to incomes list in ledger
    private void addIncomeItem(Ledger ledger, JSONObject jsonObject) {
        double amount = jsonObject.getDouble("amount");
        String source = jsonObject.getString("source");
        ledger.addIncomeNoLog(amount, source);
    }

    // MODIFIES: ledger
    // EFFECTS: parses expense object from JSON object and adds it to expenses list in ledger
    private void addExpenseItem(Ledger ledger, JSONObject jsonObject) {
        String title = jsonObject.getString("title");
        double amount = jsonObject.getDouble("amount");
        String date = jsonObject.getString("date");
        String note = jsonObject.getString("note");
        ledger.addExpenseNoLog(title, amount, date, note);
    }

    // MODIFIES: ledger
    // EFFECTS: parses goal object from JSON object and adds it to goals list in ledger
    private void addGoalItem(Ledger ledger, JSONObject jsonObject) {
        String name = jsonObject.getString("name");
        double goalAmount = jsonObject.getDouble("goalAmount");
        double currentAmount = jsonObject.getDouble("currentAmount");
        boolean complete = jsonObject.getBoolean("complete");
        ledger.setOldSavingGoal(name, goalAmount, currentAmount, complete);
    }
}
