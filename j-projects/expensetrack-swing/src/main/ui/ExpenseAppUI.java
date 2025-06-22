/*
 * THIS UI APPLICATION IS CREATED USING THE JAVA SWING DOCUMENTATION AVAILABLE AT:
 * https://docs.oracle.com/javase/tutorial/uiswing/components/index.html
 */

package ui;

import model.*;
import model.Event;
import model.EventLog;
import persistence.JsonReader;
import persistence.JsonWriter;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import javax.swing.plaf.ColorUIResource;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.FileNotFoundException;
import java.io.IOException;

public class ExpenseAppUI extends JFrame {
    private static final int WIDTH = 700; // width of the app
    private static final int HEIGHT = 600; // height of the app
    private JPanel panel; // main panel
    private Dashboard dash;
    private ExpensesPanel expensesPanel;
    private IncomePanel incomePanel;
    private GoalsPanel goalsPanel;
    private JTabbedPane tabs;
    private JMenuBar menuBar;
    private JLabel balance;
    private Ledger ledger; // object
    private JsonWriter jsonWriter;
    private JsonReader jsonReader;
    private static final String JSON_STORE = "./data/data.json";
    ImageIcon logo = new ImageIcon("./data/logo.png");
    ImageIcon smallLogo = new ImageIcon(logo.getImage().getScaledInstance(620,150, Image.SCALE_DEFAULT));

    // EFFECTS: constructs the app frame, add various components like panels
    public ExpenseAppUI() {
        init();

        setSize(WIDTH, HEIGHT);
        setTitle("Expense Tracker");
        setBackground(ColorUIResource.DARK_GRAY);
        setContentPane(panel);

        createTabs();
        createMenuBar();
        revalidate();
        repaint();

        setLocationRelativeTo(null);  // centers the frame
        setDefaultCloseOperation(DO_NOTHING_ON_CLOSE);
        this.addWindowListener(new java.awt.event.WindowAdapter() {
            @Override
            public void windowClosing(java.awt.event.WindowEvent windowEvent) {
                printLog(EventLog.getInstance());
                //Then exit the program
                System.exit(0);
            }
        });
        setVisible(true);
        setResizable(false);
        getData();
    }

    // EFFECTS: initialize high level objects which goes into main frame
    private void init() {
        panel = new JPanel();
        tabs = new JTabbedPane();
        tabs.setBackground(ColorUIResource.GRAY);
        tabs.setForeground(ColorUIResource.BLACK);
        menuBar = new JMenuBar();
        ledger = new Ledger();
        jsonWriter = new JsonWriter(JSON_STORE);
        jsonReader = new JsonReader(JSON_STORE);

        balance = new JLabel("0.00");
    }

    // EFFECTS: add tabs to the JTabbedPane tabs
    private void createTabs() {
        dash = new Dashboard();
        tabs.addTab("Dashboard",dash);

        expensesPanel = new ExpensesPanel();
        tabs.addTab("Expenses",expensesPanel);

        incomePanel = new IncomePanel();
        tabs.addTab("Incomes",incomePanel);

        goalsPanel = new GoalsPanel();
        tabs.addTab("Saving Goals",goalsPanel);

        tabs.setPreferredSize(new Dimension(670,550));
        panel.add(tabs);
    }

    /**
     *  MENU BAR
     *  EFFECTS: add menus to the menubar and add actions to the menu items
     */
    private void createMenuBar() {
        JMenu file = new JMenu("File");
        JMenu exit = new JMenu("Exit");
        file.setToolTipText("View options to load, save and create new ledger.");
        exit.setToolTipText("Exit application");
        file.setMnemonic('N');
        exit.setMnemonic('E');

        addMenuItem(file, new NewFileAction());
        addMenuItem(file, new LoadFileAction());
        addMenuItem(file, new SaveFileAction());
        menuExit(exit);
        // add menu items to menu bar
        menuBar.add(file);
        menuBar.add(exit);

        setJMenuBar(menuBar);
    }

    /**
     * Adds an item with given handler to the given menu
     */
    private void addMenuItem(JMenu theMenu, AbstractAction action) {
        JMenuItem menuItem = new JMenuItem(action);
        theMenu.add(menuItem);
    }

    /*
     * Represents the action to be taken when the user clicks exit on menu bar
     */
    private void menuExit(JMenu exit) {
        exit.addMouseListener(new MouseAdapter() {
            public void mouseClicked(MouseEvent e) {
                int confirmExit = JOptionPane.showConfirmDialog(null,
                        "Press Yes to exit the application",
                        "Confirm to exit",
                        JOptionPane.YES_NO_OPTION);

                if (confirmExit == JOptionPane.YES_OPTION) {
                    jsonWrite();
                    printLog(EventLog.getInstance());
                    System.exit(0);
                }
            }
        });
    }

    /**
     * Represents the action to be taken when the user wants to create a new ledger
     */
    private class NewFileAction extends AbstractAction {

        NewFileAction() {
            super("New");
        }

        @Override
        public void actionPerformed(ActionEvent evt) {
            int confirmNewFile = JOptionPane.showConfirmDialog(null,
                    "Are you sure?",
                    "Create new file",
                    JOptionPane.YES_NO_CANCEL_OPTION);
            if (confirmNewFile == JOptionPane.YES_OPTION) {
                ledger = new Ledger();
                update();
            }
        }
    }

    /**
     * Represents the action to be taken when the user wants to load a ledger
     */
    private class LoadFileAction extends AbstractAction {

        LoadFileAction() {
            super("Load");
        }

        @Override
        public void actionPerformed(ActionEvent evt) {
            int confirmLoadFile = JOptionPane.showConfirmDialog(null,
                    "Do you want to load your data?",
                    "Load data",
                    JOptionPane.YES_NO_CANCEL_OPTION);
            if (confirmLoadFile == JOptionPane.YES_OPTION) {
                try {
                    ledger = jsonReader.read();
                    JOptionPane.showMessageDialog(null,
                            "Loaded ledger with balance of $"
                                    + String.format("%,.2f",ledger.getBalance())
                            + " from " + JSON_STORE);
                    update();
                    printLog(EventLog.getInstance());

                } catch (IOException e) {
                    JOptionPane.showMessageDialog(null,"Unable to read from file: " + JSON_STORE);
                }
            }

        }
    }

    /**
     * MODIFIES: data.json
     * Represents the action to be taken when the user wants to save a ledger
     */
    private class SaveFileAction extends AbstractAction {

        SaveFileAction() {
            super("Save");
        }

        @Override
        public void actionPerformed(ActionEvent evt) {
            int confirmNewFile = JOptionPane.showConfirmDialog(null,
                    "Do you want to save your file",
                    "Save data",
                    JOptionPane.YES_NO_CANCEL_OPTION);

            if (confirmNewFile == JOptionPane.YES_OPTION) {
                jsonWrite();
            }
        }
    }

    /*
     * Dashboard panel in the tabs JTabbedPane
     */
    private class Dashboard extends JPanel {
        JLabel welcome;
        JLabel info;
        JLabel goalInfo;
        JLabel logoLabel;

        // EFFECTS: constructs this panel then creates and add components to it
        Dashboard() {
            setLayout(new BoxLayout(this,BoxLayout.PAGE_AXIS));
            setBorder(new EmptyBorder(5, 15, 10, 10));
            logoLabel = new JLabel(smallLogo);
            welcomeLabel();
            infoLabel();
            goalLabel();
            addComponents();
        }

        // EFFECTS: shows Welcome text
        private void welcomeLabel() {
            welcome = new JLabel("<html><h1>Welcome !</h1></html>");
        }

        // EFFECTS: initial info label when no data is loaded
        private void infoLabel() {
            info = new JLabel(homeHtml(
                    String.format("%,.2f",Double.parseDouble(balance.getText())),
                    String.format("%,.2f",ledger.totalIncome()),
                    String.format("%,.2f",ledger.totalExpenses())
            ));
        }

        // EFFECTS: string with all the dashboard info
        private String homeHtml(String balance, String income, String expense) {
            return "<html><table width='500px'><tr><td width='33%'>"
                    + "<span style='font-size:14px; color:#8a8a8a;'>Balance</span><br>"
                    + "<span style='font-size:36px;'>$" + balance + "</span></td></tr><tr>"
                    + "<td width='50%'> <span style='font-size:14px; color:#8a8a8a;'>Income</span><br>"
                    + "<span style='font-size:36px;'>$" + income + "</span></td>"
                    + "<td width='50%'> <span style='font-size:14px; color:#8a8a8a;'>Expenses</span><br>"
                    + "<span style='font-size:36px;'>$" + expense + "</span></td></tr></table></html>";
        }

        // EFFECTS: goal label with most recent saving goal being shown
        private void goalLabel() {
            goalInfo = new JLabel();
            if (ledger.getGoals().size() == 0) {
                goalInfo.setText("<html><h2>Latest Saving Goal:</h2><br>You have not created any saving goals.</html>");
                return;
            }
            String data = "<html><h2>Latest Saving Goal: </h2><br>"
                    + ledger.getSavingGoal(ledger.getGoals().size() - 1);
            goalInfo.setText(data);
        }

        // EFFECTS: sets the info label once data is loaded
        public void setInfoLabel() {
            info.setText(homeHtml(
                    String.format("%,.2f",Double.parseDouble(balance.getText())),
                    String.format("%,.2f",ledger.totalIncome()),
                    String.format("%,.2f",ledger.totalExpenses()
                    )
            ));
        }

        // EFFECTS: sets the goal label once data is loaded
        private void setGoalLabel() {
            goalInfo.setText("<html><h2>Latest Saving Goal: </h2><br>"
                    + ledger.getSavingGoal((ledger.getGoals()).size() - 1).getName() + ": $"
                    + String.format("%,.2f",ledger.getSavingGoal((ledger.getGoals()).size() - 1).getCurrentAmount())
                    + " out of $"
                    + String.format("%,.2f",ledger.getSavingGoal((ledger.getGoals()).size() - 1).getGoalAmount()));
        }

        // EFFECTS: adds all the components to the dashboard
        private void addComponents() {
            this.add(logoLabel);
            this.add(welcome);
            this.add(info);
            this.add(Box.createRigidArea(new Dimension(0,20)));
            this.add(goalInfo);
        }
    }

    /*
     * Income panel in the tabs JTabbedPane
     */
    private class IncomePanel extends JPanel {
        JLabel welcome;
        JButton addIncomeBtn;
        JButton removeIncomeBtn;
        JPanel incomesPanel;
        JScrollPane scrollPane;
        GridBagConstraints constraints;
        String[] columnNames = {"Source", "Amount ($)"};
        Object[][] incomesData;
        int rowNum = -1;

        /* EFFECTS: constructs this income panel then creates and add components to it
         * uses GridBagLayout to have this layout work as grids and set the layout using GridBagConstraints
         */
        IncomePanel() {
            setLayout(new GridBagLayout());
            constraints = new GridBagConstraints();
            constraints.fill = GridBagConstraints.BOTH;
            scrollPane = new JScrollPane();
            incomesPanel = new JPanel(new GridLayout());
            setBorder(new EmptyBorder(5, 15, 10, 10));
            welcomeLabel();
            addIncomeButton();
            removeIncomeButton();
            showIncomes();
        }

        // EFFECTS: shows Welcome text
        private void welcomeLabel() {
            welcome = new JLabel("<html><h1>List of Incomes</h1></html>");

            constraints.gridx = 0;
            constraints.gridy = 0;
            constraints.weightx = 0.5;
            constraints.gridheight = 1;

            this.add(welcome, constraints);
        }

        // EFFECTS: create add income button with a listener for when its clicked
        private void addIncomeButton() {
            addIncomeBtn = new JButton("Add");
            addIncomeBtn.addActionListener(new ActionListener() {
                public void actionPerformed(ActionEvent e) {
                    addIncomePopUp();
                }
            });
            constraints.gridx = 2;
            constraints.gridy = 0;
            constraints.weightx = 0;
            constraints.weighty = 0;

            this.add(addIncomeBtn, constraints);
        }

        /* MODIFIES: incomes list in ledger
         * EFFECTS: add income button which clicked calls this function
         * creates a popup window using JOptionPane to ask for data to create new income object
         * after creation, writes it to the json file
         */
        private void addIncomePopUp() {
            JPanel panel = new JPanel(new GridLayout(0, 1));
            JTextField source = new JTextField();
            JTextField amount = new JTextField();

            panel.add(new JLabel("Source"));
            panel.add(source);
            panel.add(new JLabel("Amount in ($)"));
            panel.add(amount);
            int result = JOptionPane.showConfirmDialog(null, panel, "Add an Income",
                    JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE);

            if (result == JOptionPane.OK_OPTION) {
                if (source.getText().isEmpty() || amount.getText().isEmpty()) {
                    JOptionPane.showMessageDialog(null, "Adding income failed, please try again.");
                }
                ledger.addIncome(Double.parseDouble(amount.getText()), source.getText());
                jsonWriteNoMsg();
                JOptionPane.showMessageDialog(null, "Income added successfully!");
            }
        }

        // EFFECTS: create remove income button with a listener for when its clicked
        private void removeIncomeButton() {
            removeIncomeBtn = new JButton("Remove");
            removeIncomeBtn.addActionListener(new ActionListener() {
                public void actionPerformed(ActionEvent e) {
                    removeIncomePopUp();
                }
            });
            constraints.gridx = 3;
            constraints.gridy = 0;
            constraints.weightx = 0;
            constraints.weighty = 0;

            this.add(removeIncomeBtn, constraints);
        }

        /* MODIFIES: incomes list in ledger
         * EFFECTS: remove income button which clicked calls this function
         * creates a popup window using JOptionPane to ask for confirmation
         * for removal of an income object
         * after deletion, writes it to the json file
         */
        private void removeIncomePopUp() {
            if (rowNum == -1) {
                JFrame f = new JFrame();
                JOptionPane.showMessageDialog(f,"Choose an item in the list!","Alert",
                        JOptionPane.WARNING_MESSAGE);
            }

            int confirmDelete = JOptionPane.showConfirmDialog(null,
                    "Confirm removal of " + ledger.getIncome(rowNum).getSource() + ": $"
                    + String.format("%,.2f", ledger.getIncome(rowNum).getAmount()),
                    "Remove Income",
                    JOptionPane.YES_NO_OPTION);
            if (confirmDelete == JOptionPane.YES_OPTION) {
                ledger.removeIncome(rowNum);
                jsonWriteNoMsg();
                JOptionPane.showMessageDialog(null, "Income removed successfully!");
            }
        }

        // EFFECTS: if there are incomes in ledger, creates a 2D array of incomes and displays it as a table
        private void showIncomes() {
            if (scrollPane.getParent() == incomesPanel) {
                incomesPanel.remove(scrollPane);
            }
            if (ledger.getIncomeList().size() != 0) {
                incomesData = new Object[ledger.getIncomeList().size()][2];
                addIncomesToTable(incomesData);
                createTable();
                incomesPanel.add(scrollPane);
                incomesPanel.revalidate();
                incomesPanel.repaint();
                constraints.gridwidth = 4;
                constraints.gridx = 0;
                constraints.gridy = 1;
                constraints.weighty = 1;
                constraints.weightx = 1;
            }
            this.add(incomesPanel, constraints);
        }

        // EFFECTS: creates new table with a listener to get selected item index
        private void createTable() {
            JTable table = new JTable(incomesData, columnNames);
            table.setDefaultEditor(Object.class, null);
            table.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
            table.setRowHeight(30);
            table.getSelectionModel().addListSelectionListener(new ListSelectionListener() {
                @Override
                public void valueChanged(ListSelectionEvent e) {
                    rowNum = table.getSelectedRow();
                }
            });
            table.setFillsViewportHeight(true);
            scrollPane = new JScrollPane(table);
        }

        // MODIFIES: incomesData
        // EFFECTS: helper function to add incomes to incomesData 2D array
        private void addIncomesToTable(Object[][] incomesData) {
            for (int r = 0; r < ledger.getIncomeList().size(); r++) {
                Income income = ledger.getIncome(r);
                incomesData[r][0] = income.getSource();
                incomesData[r][1] = String.format("%,.2f",income.getAmount());
            }
        }
    }

    /*
     * Expenses panel in the tabs JTabbedPane
     */
    private class ExpensesPanel extends JPanel {
        JLabel welcome;
        JButton addExpenseBtn;
        JButton removeExpenseBtn;
        JPanel expensesPanel;
        GridBagConstraints constraints;
        JScrollPane scrollPane;
        String[] columnNames = {"Title", "Amount ($)", "Date", "Notes"};
        Object[][] expensesData;
        int rowNum = -1;

        /* EFFECTS: constructs this expenses panel then creates and add components to it
         * uses GridBagLayout to have this layout work as grids and set the layout using GridBagConstraints
         */
        ExpensesPanel() {
            setLayout(new GridBagLayout());
            constraints = new GridBagConstraints();
            constraints.fill = GridBagConstraints.BOTH;
            scrollPane = new JScrollPane();
            expensesPanel = new JPanel(new GridLayout());
            setBorder(new EmptyBorder(5, 15, 10, 10));
            welcomeLabel();
            addExpenseButton();
            removeExpenseButton();
            showExpenses();
        }

        // EFFECTS: shows Welcome text
        private void welcomeLabel() {
            welcome = new JLabel("<html><h1>List of Expenses</h1></html>");

            constraints.gridx = 0;
            constraints.gridy = 0;
            constraints.weightx = 0.5;
            constraints.gridheight = 1;

            this.add(welcome, constraints);
        }

        // EFFECTS: create add expense button with a listener for when its clicked
        private void addExpenseButton() {
            addExpenseBtn = new JButton("Add");
            addExpenseBtn.addActionListener(new ActionListener() {
                public void actionPerformed(ActionEvent e) {
                    addExpensePopUp();
                }
            });
            constraints.gridx = 2;
            constraints.gridy = 0;
            constraints.weightx = 0;
            constraints.weighty = 0;

            this.add(addExpenseBtn, constraints);
        }

        /* MODIFIES: expenses list in ledger
         * EFFECTS: add expense button which when clicked calls this function
         * creates a popup window using JOptionPane to ask for data to create new expense object
         * after creation, writes it to the json file
         */
        private void addExpensePopUp() {
            JPanel panel = new JPanel(new GridLayout(0, 1));
            JTextField name = new JTextField();
            JTextField amount = new JTextField();
            JTextField date = new JTextField();
            JTextField note = new JTextField();
            panel.add(new JLabel("Source"));
            panel.add(name);
            panel.add(new JLabel("Amount in ($)"));
            panel.add(amount);
            panel.add(new JLabel("Date (e.g. 25 Dec, 2022)"));
            panel.add(date);
            panel.add(new JLabel("Note"));
            panel.add(note);
            int result = JOptionPane.showConfirmDialog(null, panel, "Add an Expense",
                    JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE);
            if (result == JOptionPane.OK_OPTION) {
                if (name.getText().isEmpty() || amount.getText().isEmpty() || date.getText().isEmpty()) {
                    JOptionPane.showMessageDialog(null, "Adding expense failed, please try again.");
                }
                ledger.addExpense(name.getText(), Double.parseDouble(amount.getText()),date.getText(),note.getText());
                jsonWriteNoMsg();
                JOptionPane.showMessageDialog(null, "Expense added successfully!");
            }
        }

        // EFFECTS: create remove expense button with a listener for when its clicked
        private void removeExpenseButton() {
            removeExpenseBtn = new JButton("Remove");
            removeExpenseBtn.addActionListener(new ActionListener() {
                public void actionPerformed(ActionEvent e) {
                    removeExpensePopUp();
                }
            });
            constraints.gridx = 3;
            constraints.gridy = 0;
            constraints.weightx = 0;
            constraints.weighty = 0;

            this.add(removeExpenseBtn, constraints);
        }

        private void removeExpensePopUp() {
            if (rowNum == -1) {
                JFrame f = new JFrame();
                JOptionPane.showMessageDialog(f,"Choose an item in the list!","Alert",
                        JOptionPane.WARNING_MESSAGE);
            }

            int confirmDelete = JOptionPane.showConfirmDialog(null,
                    "Confirm removal of " + ledger.getExpense(rowNum).getTitle() + ": $"
                            + String.format("%,.2f", ledger.getExpense(rowNum).getAmount()),
                    "Remove Expense",
                    JOptionPane.YES_NO_OPTION);
            if (confirmDelete == JOptionPane.YES_OPTION) {
                ledger.removeExpense(rowNum);
                jsonWriteNoMsg();
                JOptionPane.showMessageDialog(null, "Expense removed successfully!");
            }
        }

        // EFFECTS: if there are expenses in ledger, creates a 2D array of expenses and displays it as a table
        private void showExpenses() {
            if (scrollPane.getParent() == expensesPanel) {
                expensesPanel.remove(scrollPane);
            }
            if (ledger.getExpenses().size() != 0) {
                expensesData = new Object[ledger.getExpenses().size()][4];
                addExpensesToTable(expensesData);
                createTable();
                expensesPanel.revalidate();
                expensesPanel.repaint();
                constraints.gridwidth = 4;
                constraints.gridx = 0;
                constraints.gridy = 1;
                constraints.weighty = 1;
                constraints.weightx = 1;
            }
            this.add(expensesPanel, constraints);
        }

        private void createTable() {
            JTable table = new JTable(expensesData, columnNames);
            table.setDefaultEditor(Object.class, null);
            table.setRowHeight(30);
            scrollPane = new JScrollPane(table);
            table.setFillsViewportHeight(true);
            table.getSelectionModel().addListSelectionListener(new ListSelectionListener() {
                @Override
                public void valueChanged(ListSelectionEvent e) {
                    rowNum = table.getSelectedRow();
                }
            });
            expensesPanel.add(scrollPane);
        }

        // MODIFIES: expensesData
        // EFFECTS: helper function to add expenses to expensesData 2D array
        private void addExpensesToTable(Object[][] expensesData) {
            for (int r = 0; r < ledger.getExpenses().size(); r++) {
                Expense expense = ledger.getExpense(r);
                expensesData[r][0] = expense.getTitle();
                expensesData[r][1] = String.format("%,.2f",expense.getAmount());
                expensesData[r][2] = expense.getDate();
                expensesData[r][3] = expense.getNote();
            }
        }

    }

    /*
     * Saving Goals panel in the tabs JTabbedPane
     */
    private class GoalsPanel extends JPanel {
        JLabel welcome;
        JButton addGoalBtn;
        JButton contributeBtn;
        JButton removeGoalBtn;
        JPanel goalsPanel;
        JComboBox<String> goalsList;
        JScrollPane scrollPane;
        GridBagConstraints constraints;
        int temp; // value of selected item's index in contribute panel combobox
        String[] columnNames = {"Title", "Current Amount ($)", "Goal Amount ($)", "Status"};
        Object[][] goalsData;
        int rowNum = -1;

        /* EFFECTS: constructs this goals panel then creates and add components to it
         * uses GridBagLayout to have this layout work as grids and set the layout using GridBagConstraints
         */
        GoalsPanel() {
            setLayout(new GridBagLayout());
            constraints = new GridBagConstraints();
            constraints.fill = GridBagConstraints.BOTH;
            scrollPane = new JScrollPane();
            goalsPanel = new JPanel(new GridLayout());
            setBorder(new EmptyBorder(5, 15, 10, 10));
            welcomeLabel();
            addGoalButton();
            contributeButton();
            removeGoalButton();
            showGoals();
        }

        // EFFECTS: shows Welcome text
        private void welcomeLabel() {
            welcome = new JLabel("<html><h1>Saving Goals</h1></html>");

            constraints.gridx = 0;
            constraints.gridy = 0;
            constraints.weightx = 0.5;
            constraints.gridheight = 1;

            this.add(welcome, constraints);
        }

        // EFFECTS: creates add saving goal button with a listener for when its clicked
        private void addGoalButton() {
            addGoalBtn = new JButton("Create");
            addGoalBtn.addActionListener(new ActionListener() {
                public void actionPerformed(ActionEvent e) {
                    addGoalPopUp();
                }
            });
            constraints.gridx = 1;
            constraints.gridy = 0;
            constraints.weightx = 0;
            constraints.weighty = 0;

            this.add(addGoalBtn, constraints);
        }

        // EFFECTS: creates contribute to saving goal button with a listener for when its clicked
        private void contributeButton() {
            contributeBtn = new JButton("Contribute");
            contributeBtn.addActionListener(new ActionListener() {
                public void actionPerformed(ActionEvent e) {
                    contributePopUp();
                }
            });
            constraints.gridx = 2;
            constraints.gridy = 0;
            constraints.weightx = 0;
            constraints.weighty = 0;

            this.add(contributeBtn, constraints);
        }

        /* MODIFIES: goals list in ledger
         * EFFECTS: add saving goal button which when clicked calls this function
         * creates a popup window using JOptionPane to ask for data to create new goal object
         * after creation, writes it to the json file
         */
        private void addGoalPopUp() {
            JPanel panel = new JPanel(new GridLayout(0, 1));
            JTextField name = new JTextField();
            JTextField goalAmount = new JTextField();

            panel.add(new JLabel("Goal Name"));
            panel.add(name);
            panel.add(new JLabel("Goal Amount in ($)"));
            panel.add(goalAmount);
            int result = JOptionPane.showConfirmDialog(null, panel, "Add a Saving Goal",
                    JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE);

            if (result == JOptionPane.OK_OPTION) {
                if (name.getText().isEmpty() || goalAmount.getText().isEmpty()) {
                    JOptionPane.showMessageDialog(null, "Adding saving goal failed, please try again.");
                }
                ledger.setSavingGoal(name.getText(), Double.parseDouble(goalAmount.getText()));
                jsonWriteNoMsg();
                JOptionPane.showMessageDialog(null, "Saving goal added successfully!");
            }
        }

        /* MODIFIES: goals list in ledger
         * EFFECTS: contribute to saving goal button which when clicked calls this function
         * creates a popup window using JOptionPane to ask to choose a goal using combobox and the amount to contribute
         * after contribution, writes it to the json file
         */
        private void contributePopUp() {
            JPanel panel = new JPanel(new GridLayout(0, 1));
            JTextField amount = new JTextField();
            contributeCombo();
            panel.add(new JLabel("Goal"));
            panel.add(goalsList);
            panel.add(new JLabel("Contribution in ($)"));
            panel.add(amount);
            int result = JOptionPane.showConfirmDialog(null, panel, "Contribute to a Goal",
                    JOptionPane.OK_CANCEL_OPTION, JOptionPane.PLAIN_MESSAGE);
            if (result == JOptionPane.OK_OPTION) {
                if (amount.getText().isEmpty()) {
                    JOptionPane.showMessageDialog(null, "Contributing to goal failed, please try again.");
                }
                boolean success = ledger.addToSavingGoal(temp, Double.parseDouble(amount.getText()));
                if (!success) {
                    JOptionPane.showMessageDialog(null, "Failed to add contribution");
                    return;
                }
                jsonWriteNoMsg();
                JOptionPane.showMessageDialog(null, "Contribution done successfully!");
            }
        }

        /* MODIFIES: goalsList
         * EFFECTS: helper function for contributePopUp to create an array of goal titles
         * creates JComboBox using that array, then adds listener to ComboBox
         * listener records selected item index and puts it in temp
         */

        private void contributeCombo() {
            String[] chooseGoalData = new String[ledger.getGoals().size()];
            for (int r = 0; r < ledger.getGoals().size(); r++) {
                chooseGoalData[r] = ledger.getSavingGoal(r).getName();
            }
            goalsList = new JComboBox<>(chooseGoalData);
            goalsList.addActionListener(new ActionListener() {
                public void actionPerformed(ActionEvent e) {
                    JComboBox comboBox = (JComboBox) e.getSource();
                    temp = comboBox.getSelectedIndex();
                }
            });
        }

        // EFFECTS: create remove saving goal button with a listener for when its clicked
        private void removeGoalButton() {
            removeGoalBtn = new JButton("Remove");
            removeGoalBtn.addActionListener(new ActionListener() {
                public void actionPerformed(ActionEvent e) {
                    removeGoalPopUp();
                }
            });
            constraints.gridx = 4;
            constraints.gridy = 0;
            constraints.weightx = 0;
            constraints.weighty = 0;

            this.add(removeGoalBtn, constraints);
        }

        private void removeGoalPopUp() {
            if (rowNum == -1) {
                JFrame f = new JFrame();
                JOptionPane.showMessageDialog(f,"Choose an item in the list!","Alert",
                        JOptionPane.WARNING_MESSAGE);
            }

            int confirmDelete = JOptionPane.showConfirmDialog(null,
                    "Confirm removal of " + ledger.getSavingGoal(rowNum).getName() + "\nContributed: $"
                            + String.format("%,.2f", ledger.getSavingGoal(rowNum).getCurrentAmount())
                            + " out of $" + String.format("%,.2f", ledger.getSavingGoal(rowNum).getGoalAmount()),
                    "Remove Expense",
                    JOptionPane.YES_NO_OPTION);
            if (confirmDelete == JOptionPane.YES_OPTION) {
                ledger.removeSavingGoal(rowNum);
                jsonWriteNoMsg();
                JOptionPane.showMessageDialog(null, "Saving goal removed successfully!");
            }
        }

        // EFFECTS: if there are goals in ledger, creates a 2D array of goals and displays it as a table
        private void showGoals() {
            if (scrollPane.getParent() == goalsPanel) {
                goalsPanel.remove(scrollPane);
            }
            if (ledger.getGoals().size() != 0) {
                goalsData = new Object[ledger.getGoals().size()][4];
                addGoalsToTable(goalsData);
                createTable();
                goalsPanel.add(scrollPane);
                goalsPanel.revalidate();
                goalsPanel.repaint();
                constraints.gridwidth = 5;
                constraints.gridx = 0;
                constraints.gridy = 1;
                constraints.weighty = 1;
                constraints.weightx = 1;
            }
            this.add(goalsPanel, constraints);
        }

        private void createTable() {
            JTable table = new JTable(goalsData, columnNames);
            table.setDefaultEditor(Object.class, null);
            table.setFillsViewportHeight(true);
            table.setRowHeight(30);
            table.getSelectionModel().addListSelectionListener(new ListSelectionListener() {
                @Override
                public void valueChanged(ListSelectionEvent e) {
                    rowNum = table.getSelectedRow();
                }
            });
            scrollPane = new JScrollPane(table);
        }

        // MODIFIES: goalsData
        // EFFECTS: helper function to add goals to goalsData 2D array
        private void addGoalsToTable(Object[][] goalsData) {
            for (int r = 0; r < ledger.getGoals().size(); r++) {
                SavingGoal goal = ledger.getSavingGoal(r);
                goalsData[r][0] = goal.getName();
                goalsData[r][1] = String.format("%,.2f",goal.getCurrentAmount());
                goalsData[r][2] = String.format("%,.2f",goal.getGoalAmount());
                if (goal.isComplete()) {
                    goalsData[r][3] = "Completed";
                } else {
                    goalsData[r][3] = "Ongoing";
                }
            }
        }
    }

    // MODIFIES: data.json
    // EFFECTS: saves the ledger to file
    private void jsonWrite() {
        try {
            jsonWriter.open();
            jsonWriter.write(ledger);
            jsonWriter.close();
            update();
            JOptionPane.showMessageDialog(null,"Saved data to " + JSON_STORE);
        } catch (FileNotFoundException e) {
            JOptionPane.showMessageDialog(null,"Unable to write to file: " + JSON_STORE);
        }
    }

    // MODIFIES: data.json
    // EFFECTS: for writing ledger to json without any popups showing
    private void jsonWriteNoMsg() {
        try {
            jsonWriter.open();
            jsonWriter.write(ledger);
            jsonWriter.close();
            update();
        } catch (FileNotFoundException e) {
            System.out.println("Unable to write to file: " + JSON_STORE);
        }
    }

    // EFFECTS: loads the JSON, used for loading data at start of UI
    private void getData() {
        try {
            ledger = jsonReader.read();
            update();
        } catch (IOException e) {
            JOptionPane.showMessageDialog(null,"Unable to read from file: " + JSON_STORE);
        }
    }

    // EFFECTS: prints out the log for this run of application
    public void printLog(EventLog el) {
        System.out.println("\n");
        for (Event next : el) {
            System.out.println(next.toString() + "\n");
        }
    }

    /*
     * MODIFIES: this
     * Updates the components to display new data
     */
    private void update() {
        balance.setText(String.valueOf(ledger.getBalance()));
        dash.setInfoLabel();
        if (ledger.getGoals().size() != 0) {
            dash.setGoalLabel();
        }
        expensesPanel.showExpenses();
        incomePanel.showIncomes();
        goalsPanel.showGoals();
    }
}
