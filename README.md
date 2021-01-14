## Starting points
- **main.ts**: This file starts consuming events from trip queue on RabbitMQ,
whenever new event comes, it runs calculation of total distance and average speed
in the worker thread (to not block main thread by time-consuming tasks), after
the doing calculation, it sends the result to specified endpoint via REST.

- **seeder.ts**: This file starts a loop to feed rabbitmq. It generates random
trips and publishes them to RabbitMQ queues.

## Worker
`process-worker.ts` This file runs in worker thread. Runs calculation functions
and sends the result to parent thread.

## Types
All given schema in the challenge are stored in /interfaces/types.ts file.

## Utils
This folder contains utility functions that are used in calculations and seeder.

### trip-calculations.ts
This file exposes bunch of functions that are being used for calculating enhance
fields.

`calculateTotalDistance` uses latitude and longitude values of every two
continuous points to calculate the distance traveled between them.

`calculateAverageSpeed` computes time difference between start and end
data points and calculates average speed by `(distance / time)` formula.

`measureDistance` computes distance between two coordination points in meters.

`calculateEnhanceFields` calls above functions and returns totalDistance and
averageSpeed fields

### seeder-helpers.ts
This file includes functions for generating random trip and trip fields.

### utils.ts
This file includes general utility functions, it only has a function to
adopt time-out with async/await syntax for now.
