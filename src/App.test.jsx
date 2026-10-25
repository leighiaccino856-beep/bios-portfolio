import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import App from './App'

function enterSetup() {
  render(<App />)
  fireEvent.keyDown(window, { key: 'Enter' })
}

describe('BIOS site', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    })
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('shows the POST screen and enters setup on a key press', () => {
    render(<App />)

    expect(screen.getByText(/to enter SETUP/i)).toBeTruthy()

    fireEvent.keyDown(window, { key: 'Enter' })

    expect(screen.getByRole('heading', { name: 'BIOS Setup Utility' })).toBeTruthy()
    expect(screen.getByRole('tab', { name: 'Main' }).getAttribute('aria-selected')).toBe('true')
  })

  it('switches tabs with arrow keys and shows item-specific help', () => {
    enterSetup()

    fireEvent.keyDown(window, { key: 'ArrowRight' })

    expect(screen.getByRole('tab', { name: 'Advanced' }).getAttribute('aria-selected')).toBe('true')
    expect(screen.getByRole('heading', { name: 'Python' })).toBeTruthy()
    expect(screen.getByText(/Основной язык профиля/)).toBeTruthy()
  })

  it('moves the row selection with arrow keys', () => {
    enterSetup()

    expect(screen.getByRole('option', { name: /Имя владельца/ }).getAttribute('aria-selected')).toBe('true')

    fireEvent.keyDown(window, { key: 'ArrowDown' })

    expect(screen.getByRole('option', { name: /Профессия/ }).getAttribute('aria-selected')).toBe('true')
    expect(screen.getByRole('heading', { name: 'Профессия' })).toBeTruthy()
  })

  it('copies a contact value and reports it in the status line', async () => {
    enterSetup()

    fireEvent.click(screen.getByRole('tab', { name: 'Security' }))
    fireEvent.click(screen.getByText('leighiaccino856@gmail.com'))

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('leighiaccino856@gmail.com')
    expect(await screen.findByText(/скопировано в буфер обмена/)).toBeTruthy()
  })

  it('opens the GitHub profile from the contact list', () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    enterSetup()

    fireEvent.click(screen.getByRole('tab', { name: 'Security' }))
    fireEvent.click(screen.getByText('leighiaccino856-beep'))

    expect(open).toHaveBeenCalledWith(
      'https://github.com/leighiaccino856-beep',
      '_blank',
      'noopener,noreferrer',
    )
  })

  it('reboots from the Exit tab opened with F10', () => {
    enterSetup()

    fireEvent.keyDown(window, { key: 'F10' })
    expect(screen.getByRole('tab', { name: 'Exit' }).getAttribute('aria-selected')).toBe('true')

    fireEvent.click(screen.getByText('Discard Changes and Exit'))

    expect(screen.getByText(/to enter SETUP/i)).toBeTruthy()
    expect(screen.queryByRole('heading', { name: 'BIOS Setup Utility' })).toBeNull()
  })
})
