import java.awt. *;
import java.awt. event. *;
import javax. swing. *;

public class pb7 implements ActionListener {
    JTextField code, title, price;
    JButton bill, clear;
    JLabel lbl1, lbl2, lbl3, discount, net;

    pb7() {
        JFrame jfrm = new JFrame("SHOPPING");
        jfrm.setSize(300, 300);
        jfrm.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jfrm.setLayout(new FlowLayout ());
        lbl1 = new JLabel("enter the book code:");
        lbl2 = new JLabel("enter the book name:");
        lbl3 = new JLabel("enter the book price:");

        code = new JTextField(3);
        title = new JTextField(3);
        price = new JTextField(3);

        bill = new JButton("bill");
        clear = new JButton("clear");
        discount = new JLabel ("");
        net = new JLabel("");
        bill.addActionListener(this);
        clear.addActionListener(this);
        jfrm.add(lbl1);
        jfrm.add(code);
        jfrm.add(lbl2);
        jfrm.add(title);
        jfrm.add(lbl3);
        jfrm.add(price);
        jfrm.add(bill);
        jfrm.add(clear);
        jfrm.add(discount);
        jfrm.add(net);
        jfrm.setVisible(true);
    }

    public void actionPerformed(ActionEvent ae) {
        if (ae.getActionCommand().equals("bill")) {
            int c = Integer.parseInt(code.getText());
            int prc = Integer.parseInt(price.getText());
            int netamount, discount1;
            if (c == 101)
                discount1 = (prc * 15) / 100;
            else if (c == 102)
                discount1 = (prc * 20) / 100;
            if (c == 103)
                discount1 = (prc * 25) / 100;
            else
                discount1 = (prc * 5) / 100;
            netamount = (prc - discount1);
            discount.setText("Discount:" + discount1);
            net.setText("net bill:" + netamount);
        } else {
            code.setText("");
            title.setText("");
            price.setText("");
            discount.setText("");
            net.setText ("");
        }
    }

    public static void main (String [] args) {
        pb7 p=new pb7();

    }
}
