import ProcessEvent from './processEvent'

test('ProcessEvent', async () => {
  const mockWorkFn = jest.fn()
  await ProcessEvent({ workFn: mockWorkFn, data: { fakeData: 1 }, eventName: 'testEvent'})
  expect(mockWorkFn.mock.calls.length).toBe(1)
})
