import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Calculator from '../../../src/components/Calculator';

const getDisplayValue = () => screen.getByTestId('display-value');
const click = async (label) => {
  const btn = await screen.findByRole('button', { name: new RegExp('^' + label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$') });
  await userEvent.click(btn);
};

describe('Calculator UI integration', () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  it('2 + 3 = → 5', async () => {
    await click('2');
    await click('+');
    await click('3');
    await click('=');
    expect(getDisplayValue()).toHaveTextContent('5');
  });

  it('√9 = → 3', async () => {
    // Clear, then 9, sqrt
    await click('C');
    await click('9');
    await click('²√x');
    expect(getDisplayValue()).toHaveTextContent('3');
  });

  it('10 % → behaves as 0.1 (percent of current entry)', async () => {
    await click('C');
    await click('1');
    await click('0');
    await click('%');
    expect(getDisplayValue()).toHaveTextContent('0.1');
  });

  it('groups thousands while typing (1000 → 1,000)', async () => {
    await click('C');
    await click('1');
    await click('0');
    await click('0');
    await click('0');
    expect(getDisplayValue()).toHaveTextContent('1,000');
  });

  it('switches to scientific notation for very small decimal during input', async () => {
    await click('C');
    await click('0');
    await click('.');
    // type 9 zeros then a 1 => 0.0000000001
    for (let i = 0; i < 9; i++) {
      await click('0');
    }
    await click('1');
    // Now display should be scientific (e-)
    expect(getDisplayValue().textContent).toMatch(/e-/);
  });

  it('history is created after equals and selecting history restores value', async () => {
    await click('C');
    await click('2');
    await click('×');
    await click('3');
    await click('=');
    expect(getDisplayValue()).toHaveTextContent('6');

    // Open history panel
    const historyToggle = screen.getByRole('button', { name: /🕐/ });
    await userEvent.click(historyToggle);

    // Click the first history item (use class selector for deterministic target)
    const items = document.querySelectorAll('.history-item');
    expect(items.length).toBeGreaterThan(0);
    await userEvent.click(items[0]);

    // Display should still show the result
    expect(getDisplayValue()).toHaveTextContent('6');
  });
});
