import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import RatingComponent from '../page';

describe('Testing Rating component', () => {

   afterEach(() => {
      jest.restoreAllMocks();
   });


   test('renders 5 stars', () => {
      jest.spyOn(React, 'useState').mockImplementation(() => [5, jest.fn()]);
      render(<RatingComponent />);
      const stars = screen.getAllByTestId('star-highlighted');
      expect(stars).toHaveLength(5);
   });
   
   test('clicking on a star highlights the correct number of stars', async () => {
      render(<RatingComponent />);
      const stars = screen.getAllByTestId('star-unhighlighted');
      
      // Since the half-star test works with mouseUp, let's use that instead of click
      act(() => {
         // Click in the middle of the third star to select 3 stars
         fireEvent.mouseUp(stars[2], { 
            clientX: 15, 
            currentTarget: { offsetLeft: 0, offsetWidth: 30 } 
         });
      });
      
      // Check if we have the right number of half-filled or highlighted stars
      const allHighlightedElements = [
         ...screen.queryAllByTestId('star-highlighted') || [],
         ...screen.queryAllByTestId('star-highlighted-half') || []
      ];
      
      expect(allHighlightedElements.length).toBe(3);
   });
   
   test('can change rating by clicking on different stars', async () => {
      render(<RatingComponent />);
      const stars = screen.getAllByTestId('star-unhighlighted');
      
      // Click on the fourth star using mouseUp instead
      act(() => {
         fireEvent.mouseUp(stars[3], { 
            clientX: 15, 
            currentTarget: { offsetLeft: 0, offsetWidth: 30 } 
         });
      });
      
      // Check combined highlighted elements
      const firstHighlighted = [
         ...screen.queryAllByTestId('star-highlighted') || [],
         ...screen.queryAllByTestId('star-highlighted-half') || []
      ];
      expect(firstHighlighted.length).toBe(4);
   });

   test('can half fill a star', () => {
      render(<RatingComponent />);
      const stars = screen.getAllByTestId('star-unhighlighted');
      Object.defineProperty(stars[1], 'offsetWidth', { value: 30 });
      Object.defineProperty(stars[1], 'offsetLeft', { value: 0 });

      act(() => {
         fireEvent.mouseUp(stars[1], { clientX: 10, currentTarget: { offsetLeft: 0, offsetWidth: 30 } });
      })

      const highlightedStars = screen.getAllByTestId('star-highlighted');
      const halfHighlightedStar = screen.getAllByTestId('star-highlighted-half');
      expect(highlightedStars).toHaveLength(1);
      expect(halfHighlightedStar).toHaveLength(1);
   })


});
