
truncate products cascade ;

insert into products (id, title, description, price)
values ('7567ec4b-b10c-45c5-9345-fc73c48a80a1', 'Screw pin anchor shackles', 'Intended for use in temporary lifting jobs. Has a screw pin for quick installation and removal.', floor(random() * 100 + 1)),
       ('7567ec4b-b10c-48c5-9445-fc73c48a80a2', 'Forged eye & eye', 'Eye end fittings are used with connecting components that can be opened and attached to the eye.', floor(random() * 100 + 1)),
       ('7567ec4b-b10c-48c5-9345-fc73348a80a3', 'Sex bolts', 'Sex bolts, also known as Chicago bolts, resemble machine screws, but with internal threads.', floor(random() * 100 + 1)),
       ('7567ec4b-b10c-48c5-9345-fc73c48a80a4', 'Mating screws', 'Mating screws have an unthreaded shoulder that is the same diameter as the outside of the sex bolts they are used with.', floor(random() * 100 + 1)),
       ('7567ec4b-b10c-48c5-9345-fc73c48a80a5', 'Chrome bolt covers', 'Decorative chrome covers for the heads of bolts and screws.', floor(random() * 100 + 1)),
       ('7567ec4b-b10c-48c5-9345-fc73c48a80a6', 'Double loop hitch pin clips', 'Double loop hitch pin clips are R-shaped clips with a coil to provide additional durability in clevis pin or hitch pin systems. Also known as bridge pins.', floor(random() * 100 + 1)),
       ('7567ec4b-b10c-48c5-9345-fc73c48a80a7', 'Rivet Nuts', 'Rivet nuts are useful for adding a load-bearing machine thread to sheet material applications and other thin surfaces. Available in a variety of types and sizes.', floor(random() * 100 + 1)),
       ('7567ec4b-b10c-48c5-9345-fc73c48a80a8', 'Flange nuts, prevailing torque', 'An all metal lock nut with a built in washer often used in high temperature applications. This style of lock nut deforms the threads of the mated fastener. Can be domed or flat style.', floor(random() * 100 + 1))
;

insert into stocks (product_id, count)
values ('7567ec4b-b10c-45c5-9345-fc73c48a80a1', floor(random() * 100 + 1)),
       ('7567ec4b-b10c-48c5-9445-fc73c48a80a2', floor(random() * 100 + 1)),
       ('7567ec4b-b10c-48c5-9345-fc73348a80a3', floor(random() * 100 + 1)),
       ('7567ec4b-b10c-48c5-9345-fc73c48a80a4', floor(random() * 100 + 1)),
       ('7567ec4b-b10c-48c5-9345-fc73c48a80a5', floor(random() * 100 + 1)),
       ('7567ec4b-b10c-48c5-9345-fc73c48a80a6', floor(random() * 100 + 1)),
       ('7567ec4b-b10c-48c5-9345-fc73c48a80a7', floor(random() * 100 + 1)),
       ('7567ec4b-b10c-48c5-9345-fc73c48a80a8', floor(random() * 100 + 1))
;
