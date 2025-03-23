import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [previousCalculation, setPreviousCalculation] = useState('');
  const [openParenthesis, setOpenParenthesis] = useState(0);

  const inputDigit = (digit: number) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setPreviousCalculation('');
    setOpenParenthesis(0);
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
      setPreviousCalculation(display + ' ' + getOperatorSymbol(nextOperator));
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
      setPreviousCalculation(result + ' ' + getOperatorSymbol(nextOperator));
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const getOperatorSymbol = (op: string) => {
    switch (op) {
      case '+':
        return '+';
      case '-':
        return '−';
      case '*':
        return '×';
      case '/':
        return '÷';
      case 'pow':
        return '^';
      case 'sqrt':
        return '√';
      default:
        return op;
    }
  };

  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      case 'pow':
        return Math.pow(firstOperand, secondOperand);
      case 'sqrt':
        return Math.sqrt(secondOperand);
      default:
        return secondOperand;
    }
  };

  const calculateResult = () => {
    if (!operator || firstOperand === null) return;

    const inputValue = parseFloat(display);
    const result = calculate(firstOperand, inputValue, operator);
    const calculation = previousCalculation + ' ' + display + ' = ' + result;
    setDisplay(String(result));
    setPreviousCalculation(calculation);
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleParenthesis = () => {
    if (display === '0') {
      setDisplay('(');
      setOpenParenthesis(openParenthesis + 1);
    } else {
      if (openParenthesis > 0) {
        setDisplay(display + ')');
        setOpenParenthesis(openParenthesis - 1);
      } else {
        setDisplay(display + '(');
        setOpenParenthesis(openParenthesis + 1);
      }
    }
  };

  const calculateSquareRoot = () => {
    const value = parseFloat(display);
    if (value >= 0) {
      const result = Math.sqrt(value);
      setDisplay(String(result));
      setPreviousCalculation('√(' + value + ') = ' + result);
    } else {
      setDisplay('Error');
    }
  };

  const calculatePower = () => {
    if (firstOperand === null) {
      setFirstOperand(parseFloat(display));
      setPreviousCalculation(display + '^');
      setWaitingForSecondOperand(true);
      setOperator('pow');
    }
  };

  const renderButton = (
    text: string,
    onPress: () => void,
    color = '#333333',
    textColor = '#ffffff',
    gridStyle?: any,
  ) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, gridStyle]}
      onPress={onPress}>
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.calculator}>
      <View style={styles.displayContainer}>
        <Text style={styles.previousCalculation}>{previousCalculation}</Text>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {display}
        </Text>
      </View>

      <View style={styles.gridContainer}>
        {/* Fila 1 */}
        {renderButton('( )', handleParenthesis, '#A5A5A5', '#000000', styles.functionButton)}
        {renderButton('x^y', calculatePower, '#A5A5A5', '#000000', styles.functionButton)}
        {renderButton(
          '%',
          () => setDisplay(String(parseFloat(display) / 100)),
          '#A5A5A5',
          '#000000',
          styles.functionButton,
        )}
        {renderButton('C', clear, '#A5A5A5', '#000000', styles.functionButton)}
        {renderButton('\u232b', backspace, '#A5A5A5', '#000000', styles.functionButton)}

        {/* Fila 2 */}
        {renderButton('7', () => inputDigit(7), undefined, undefined, styles.numberButton)}
        {renderButton('8', () => inputDigit(8), undefined, undefined, styles.numberButton)}
        {renderButton('9', () => inputDigit(9), undefined, undefined, styles.numberButton)}
        {renderButton(
          '\u00f7',
          () => handleOperation('/'),
          '#FF9427',
          undefined,
          styles.operatorButton,
        )}
        {renderButton('\u221a', calculateSquareRoot, '#A5A5A5', '#000000', styles.functionButton)}

        {/* Fila 3 */}
        {renderButton('4', () => inputDigit(4), undefined, undefined, styles.numberButton)}
        {renderButton('5', () => inputDigit(5), undefined, undefined, styles.numberButton)}
        {renderButton('6', () => inputDigit(6), undefined, undefined, styles.numberButton)}
        {renderButton(
          '\u00d7',
          () => handleOperation('*'),
          '#FF9427',
          undefined,
          styles.operatorButton,
        )}
        {renderButton(
          '\u00b1',
          () => setDisplay(String(parseFloat(display) * -1)),
          '#A5A5A5',
          '#000000',
          styles.functionButton,
        )}

        {/* Fila 4 */}
        {renderButton('1', () => inputDigit(1), undefined, undefined, styles.numberButton)}
        {renderButton('2', () => inputDigit(2), undefined, undefined, styles.numberButton)}
        {renderButton('3', () => inputDigit(3), undefined, undefined, styles.numberButton)}
        {renderButton('-', () => handleOperation('-'), '#FF9427', undefined, styles.operatorButton)}
        <View style={styles.emptySpace} />

        {/* Fila 5 */}
        {renderButton('0', () => inputDigit(0), undefined, undefined, styles.zeroButton)}
        {renderButton('.', inputDecimal, undefined, undefined, styles.numberButton)}
        {renderButton('+', () => handleOperation('+'), '#FF9427', undefined, styles.operatorButton)}
        {renderButton('=', calculateResult, '#FF9427', undefined, styles.equalsButton)}
        <View style={styles.emptySpace} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calculator: {
    backgroundColor: '#1C1C1C',
    borderRadius: 20,
    overflow: 'hidden',
    width: '93%',
    height: 580,
    padding: 20,
    gap: 10,
  },
  displayContainer: {
    height: 120,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 16,
  },
  previousCalculation: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 5,
  },
  displayText: {
    fontSize: 56,
    color: '#ffffff',
    fontWeight: '300',
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '500',
  },
  functionButton: {
    width: '17%',
    backgroundColor: '#A5A5A5',
  },
  numberButton: {
    width: '17%',
    backgroundColor: '#333333',
  },
  operatorButton: {
    width: '17%',
    backgroundColor: '#FF9427',
  },
  equalsButton: {
    width: '17%',
    height: 154, // Double the height (72 * 2 + 10 for gap)
    backgroundColor: '#FF9427',
    position: 'absolute',
    bottom: 10,
    right: 0,
  },
  zeroButton: {
    width: '38%',
    backgroundColor: '#333333',
  },
  emptySpace: {
    width: '17%',
    height: 72,
  },
});
