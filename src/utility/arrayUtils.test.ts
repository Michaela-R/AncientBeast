import { Creature } from '../creature';
import { Hex, Direction } from './hex';
import { findPos, removePos, sortByDirection, last } from './arrayUtils';

jest.mock('../creature', () => {
	return {
		Creature: jest.fn().mockImplementation((id: number) => {
			return {
				id: id,
				pos: { x: 1, y: 2 },
			};
		}),
	};
});

jest.mock('./hex', () => {
	return {
		Hex: jest.fn().mockImplementation((creature: Creature) => {
			return {
				creature: creature,
			};
		}),
		Direction: {
			Left: 4,
			Right: 1,
		},
	};
});

describe('arrayUtils', () => {
	describe('findPos', () => {
		const creature = new Creature(1);
		const creature2 = new Creature(2);
		it('should find the object in the array', () => {
			const arr = [creature, creature2];
			const obj = creature2;
			const result = findPos(arr, obj);
			expect(result).toEqual(creature2);
		});
		it('should return false if the object is not in the array', () => {
			const arr = [creature];
			const obj = creature2;
			const result = findPos(arr, obj);
			expect(result).toEqual(false);
		});
		it('should return false if array is empty', () => {
			const arr = [];
			const obj = creature;
			const result = findPos(arr, obj);
			expect(result).toEqual(false);
		});
	});

	describe('removePos', () => {
		const creature = new Creature(1);
		const creature2 = new Creature(2);
		it('should remove the object from the array', () => {
			const arr = [creature, creature2];
			const obj = creature;
			const result = removePos(arr, obj);
			expect(result).toEqual(true);
			expect(arr).toEqual([creature2]);
		});
		it('should return false if the object is not in the array', () => {
			const arr = [creature];
			const obj = creature2;
			const result = removePos(arr, obj);
			expect(result).toEqual(false);
			expect(arr).toEqual([creature]);
		});
		it('should return false if array is empty', () => {
			const arr = [];
			const obj = creature;
			const result = removePos(arr, obj);
			expect(result).toEqual(false);
			expect(arr).toEqual([]);
		});
	});

	describe('sortByDirection', () => {
		// @ts-ignore
		const hex = new Hex(new Creature(1));
		hex.x = 1;
		hex.y = 1;
		// @ts-ignore
		const hex2 = new Hex(new Creature(2));
		hex2.x = 2;
		hex2.y = 2;
		// @ts-ignore
		const hex3 = new Hex(new Creature(3));
		hex3.x = 3;
		hex3.y = 3;
		it('should not change the order of the array', () => {
			const arr = [hex, hex2, hex3];
			const result = sortByDirection(arr, Direction.Left);
			expect(result).toEqual(arr);
		});
		it('should return same array if array is empty', () => {
			const arr = [];
			const result = sortByDirection(arr, Direction.Left);
			expect(result).toEqual([]);
		});
		it('should return sorted array of hexes by x from lowest to highest', () => {
			const hexes = [hex, hex3, hex2];
			const result = sortByDirection(hexes, Direction.Right);
			expect(result).toEqual([hex, hex2, hex3]);
		});
		it('should return sorted array of hexes by x from highest to lowest', () => {
			const hexes = [hex, hex3, hex2];
			const result = sortByDirection(hexes, Direction.Left);
			expect(result).toEqual([hex3, hex2, hex]);
		});
	});

	describe('last', () => {
		it('should return last element of array', () => {
			const arr = [1, 2, 3];
			const result = last(arr);
			expect(result).toEqual(3);
		});
		it('should return undefined if array is empty', () => {
			const arr = [];
			const result = last(arr);
			expect(result).toEqual(undefined);
		});
	});
});
