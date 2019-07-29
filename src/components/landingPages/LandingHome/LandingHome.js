import React from 'react';
import Landing from '../Landing';
import TextPost from '../../TextPost/TextPost';

export default function(props) {
  return (
    <Landing heading='Brian Chesko'>
      <TextPost heading='What is this page?'>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Magna etiam tempor orci eu lobortis elementum nibh tellus. Habitant
          morbi tristique senectus et netus et malesuada. Vitae sapien pellentesque habitant morbi tristique.
          Arcu non sodales neque sodales ut etiam. Quam pellentesque nec nam aliquam sem et tortor consequat id.
          Eu volutpat odio facilisis mauris sit amet massa vitae. Risus nec feugiat in fermentum posuere.
          Tincidunt praesent semper feugiat nibh. Lorem sed risus ultricies tristique nulla. Neque gravida in
          fermentum et sollicitudin ac orci phasellus egestas. Aliquam ultrices sagittis orci a scelerisque
          purus semper eget. Vitae justo eget magna fermentum iaculis eu non diam phasellus. Eu ultrices vitae
          auctor eu augue ut lectus arcu. Nisl pretium fusce id velit ut tortor pretium.
        </p>

        <p>
          Facilisis sed odio morbi quis commodo. Urna nec tincidunt praesent semper. Augue neque gravida
          in fermentum et sollicitudin ac orci phasellus. Fringilla urna porttitor rhoncus dolor purus non
          enim praesent. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.
          Turpis cursus in hac habitasse. Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero.
          Bibendum enim facilisis gravida neque convallis. Scelerisque felis imperdiet proin fermentum leo.
          Pharetra convallis posuere morbi leo urna molestie. Eu mi bibendum neque egestas congue quisque
          egestas diam in. Volutpat commodo sed egestas egestas fringilla. Nibh tellus molestie nunc non
          blandit massa enim nec dui. Quam nulla porttitor massa id neque aliquam vestibulum morbi.
        </p>
      </TextPost>
      <TextPost heading='Second post'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. A diam sollicitudin tempor id eu nisl. Pretium aenean pharetra magna ac.
      </TextPost>
      <TextPost>
        <h3>
          Third text post, missing heading
        </h3>
        <p>
          Sample text
        </p>
      </TextPost>
    </Landing>
  );
}